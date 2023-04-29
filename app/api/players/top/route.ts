import {NextResponse} from 'next/server'
import {db} from '~/lib/db'

export async function GET() {
  const players = await db.user.findMany({
    where: {
      matches: {
        every: {},
      },
    },
    orderBy: {
      eloRating: 'desc',
    },
    take: 50,
    include: {
      _count: {
        select: {matches: true},
      },
    },
  })

  return NextResponse.json(
    players
      .filter(player => player._count.matches > 5)
      .map((player, index) => ({
        id: player.id,
        name: player.name,
        eloRating: player.eloRating,
        image: player.image,
        matches: player._count.matches,
        position: index + 1,
      })),
  )
}
