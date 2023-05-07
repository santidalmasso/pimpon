import {redirect} from 'next/navigation'
import {authOptions} from '~/lib/auth'
import {getCurrentUser} from '~/lib/session'
import {buttonVariants} from '~/components/ui/button'
import {DashboardHeader, DashboardShell} from '~/components/dashboard'
import {cn} from '~/lib/utils'
import {Icons} from '~//components/icons'
import Link from 'next/link'
import {getMatches} from '~/services/match'
import {MatchItem} from '~/components/match/match-item'

export const metadata = {
  title: 'Matches',
}

export default async function DashboardPage() {
  const [user, matches] = await Promise.all([getCurrentUser(), getMatches()])

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Matches" text="Create and view matches.">
        <Link href="/dashboard/new" className={cn(buttonVariants())}>
          <Icons.add className="w-4 h-4 mr-2" />
          New match
        </Link>
      </DashboardHeader>
      <div>
        {matches.length === 0 ? (
          <div className="grid border rounded-md h-96 place-content-center">
            <h2 className="mt-6 text-xl font-semibold text-center text-gray-500">
              No matches yet.
            </h2>
            <p className="mt-2 mb-8 text-sm font-normal leading-6 text-center text-slate-800">
              You don&apos;t have any matches yet. Start creating content.
            </p>
            <Link
              href="/dashboard/new"
              className={cn(
                'w-44 mx-auto',
                buttonVariants({variant: 'outline'}),
              )}
            >
              <Icons.add className="w-4 h-4 mr-2" />
              Create a match
            </Link>
          </div>
        ) : (
          <ul className="overflow-hidden border divide-y rounded-md divide-border">
            {matches.map((match: any) => (
              <li key={match.id}>
                <MatchItem match={match} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardShell>
  )
}
