import {MatchItem} from '~/components/match/match-item'
import {DashboardHeader, DashboardShell} from '~/components/dashboard'
import Link from 'next/link'
import {Icons} from '~/components/icons'
import {cn} from '~/lib/utils'
import {buttonVariants} from '~/components/ui/button'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Matches" text="Create and view matches.">
        <Link href="/dashboard/new" className={cn(buttonVariants())}>
          <Icons.add className="w-4 h-4 mr-2" />
          New match
        </Link>
      </DashboardHeader>
      <div className="overflow-hidden border divide-y rounded-md divide-border">
        <MatchItem.Skeleton />
        <MatchItem.Skeleton />
        <MatchItem.Skeleton />
        <MatchItem.Skeleton />
        <MatchItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
