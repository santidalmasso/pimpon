import {NextResponse} from 'next/server'
import {db} from '~/lib/db'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const query = searchParams.get('query') || ''

  const players = await db.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
      ],
    },
  })

  return NextResponse.json(players)
}
