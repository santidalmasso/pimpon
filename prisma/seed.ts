import {db} from '~/lib/db'

async function main() {
  const alice = await db.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@mail.com',
        image: 'https://i.pravatar.cc/150?img=bob',
      },
      {
        name: 'Bob',
        email: 'bob@mail.com',
        image: 'https://i.pravatar.cc/150?img=bob',
      },
      {
        name: 'Fede',
        email: 'fede@mail.com',
        image: 'https://i.pravatar.cc/2',
      },
      {
        name: 'Carol',
        email: 'carol@mail.com',
        image: 'https://i.pravatar.cc/150?img=john',
      },
    ],
  })
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
