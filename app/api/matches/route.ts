import {NextResponse} from 'next/server'
import {db} from '~/lib/db'
import {createMatchSchema} from '~/lib/validations/match'
import * as z from 'zod'
import {MatchStatus, MatchTeam} from '@prisma/client'
import {getServerSession} from 'next-auth'
import {authOptions} from '~/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', {status: 403})
    }

    const {user} = session

    const matches = await db.match.findMany({
      where: {
        status: {
          not: MatchStatus.Rejected,
        },
        users: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 15,
    })

    return NextResponse.json(
      matches.map(match => ({
        id: match.id,
        teamAScore: match.teamAScore,
        teamBScore: match.teamBScore,
        status: match.status,
        createdAt: match.createdAt,
        createdByMe: match.createdByUserId === user.id,
        players: match.users.map(user => ({
          userId: user.userId,
          team: user.team,
          image: user.user.image,
          name: user.user.name,
        })),
      })),
    )
  } catch (error) {
    return new Response(null, {status: 500})
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = createMatchSchema.parse(json)
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', {status: 403})
    }

    const {user} = session

    const players = await db.user.findMany({
      where: {
        id: {
          in: [body.player1, body.player2, body.player3, body.player4].filter(
            Boolean,
          ) as string[],
        },
      },
    })

    const player1 = players.find(p => p.id === body.player1)
    const player2 = players.find(p => p.id === body.player2)
    const player3 = players.find(p => p.id === body.player3)
    const player4 = players.find(p => p.id === body.player4)

    if (player1 === undefined || player2 === undefined) {
      return new Response(`Invalid players`, {status: 400})
    }

    const matchCreated = await db.match.create({
      data: {
        teamAScore: body.teamAScore,
        teamBScore: body.teamBScore,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        users: {
          createMany: {
            data: [
              {
                team: MatchTeam.TeamA,
                userId: player1.id,
                eloSnapshot: player1.eloRating,
              },
              {
                team: MatchTeam.TeamB,
                userId: player2.id,
                eloSnapshot: player2.eloRating,
              },
              ...(player3 && player4
                ? [
                    {
                      team: MatchTeam.TeamA,
                      userId: player3.id,
                      eloSnapshot: player3.eloRating,
                    },
                    {
                      team: MatchTeam.TeamB,
                      userId: player4.id,
                      eloSnapshot: player4.eloRating,
                    },
                  ]
                : []),
            ],
          },
        },
      },
    })

    return NextResponse.json(matchCreated)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {status: 422})
    }

    return new Response(null, {status: 500})
  }
}
