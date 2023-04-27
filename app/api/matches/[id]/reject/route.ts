import {getServerSession} from 'next-auth'
import {NextResponse} from 'next/server'
import {db} from '~/lib/db'
import {authOptions} from '~/lib/auth'
import {MatchStatus, MatchTeam, User, UsersOnMatches} from '@prisma/client'

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

    if (match.createdByUserId === user.id) {
      return new Response('Unauthorized', {status: 403})
    }

    await db.match.update({
      where: {
        id,
      },
      data: {
        status: MatchStatus.Rejected,
      },
    })

    return NextResponse.json({})
  } catch (error) {
    console.error(error)
    return new Response(null, {status: 500})
  }
}
