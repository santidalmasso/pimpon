import {getServerSession} from 'next-auth'
import {NextResponse} from 'next/server'
import {db} from '~/lib/db'
import {authOptions} from '~/lib/auth'
import {MatchStatus, MatchTeam, User, UsersOnMatches} from '@prisma/client'
import {calculateEloRatings} from './calculate-elo-ratings'

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: {id: string}
  },
) {
  try {
    const id = params.id
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', {status: 403})
    }

    const {user} = session

    const match = await db.match.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!match) {
      return new Response(null, {status: 404})
    }

    if (!match.users.some(u => u.userId === user?.id)) {
      return new Response('Unauthorized', {status: 403})
    }

    const teamA: UsersOnMatches[] = []
    const teamB: UsersOnMatches[] = []

    for (const userOnMatch of match.users) {
      if (userOnMatch.team === MatchTeam.TeamA) teamA.push(userOnMatch)
      if (userOnMatch.team === MatchTeam.TeamB) teamB.push(userOnMatch)
    }

    if (teamA.length !== teamB.length) {
      return new Response(null, {status: 400})
    }

    if (match.createdByUserId === user.id) {
      return new Response('Unauthorized', {status: 403})
    }

    const {player1Rating, player2Rating, player3Rating, player4Rating} =
      calculateEloRatings({
        player1ActualElo: teamA[0].eloSnapshot,
        player2ActualElo: teamB[0].eloSnapshot,
        player3ActualElo: teamA[1]?.eloSnapshot ?? null,
        player4ActualElo: teamB[1]?.eloSnapshot ?? null,
        teamAScore: match.teamAScore,
        teamBScore: match.teamBScore,
      })

    const updateMatch = db.match.update({
      where: {
        id,
      },
      data: {
        status: MatchStatus.Confirmed,
      },
    })

    const updatePlayer1 = db.user.updateMany({
      where: {
        id: teamA[0].userId,
      },
      data: {
        eloRating: player1Rating,
      },
    })

    const updatePlayer2 = db.user.updateMany({
      where: {
        id: teamB[0].userId,
      },
      data: {
        eloRating: player2Rating,
      },
    })

    const updatePlayer3 = teamA[1]
      ? await db.user.updateMany({
          where: {
            id: teamA[1].userId,
          },
          data: {
            eloRating: player3Rating,
          },
        })
      : null

    const updatePlayer4 = teamB[1]
      ? await db.user.updateMany({
          where: {
            id: teamB[1].userId,
          },
          data: {
            eloRating: player4Rating,
          },
        })
      : null

    const queries = [
      updateMatch,
      updatePlayer1,
      updatePlayer2,
      updatePlayer3,
      updatePlayer4,
    ].filter(Boolean)
    // @ts-expect-error filter removes nulls but TS doesn't know that
    await db.$transaction(queries)

    return NextResponse.json({})
  } catch (error) {
    console.error(error)
    return new Response(null, {status: 500})
  }
}
