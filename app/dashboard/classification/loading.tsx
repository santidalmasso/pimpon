import {ClassificationItem} from '~/components/classification-item'
import {DashboardHeader, DashboardShell} from '~/components/dashboard'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Classification" text="Top players" />
      <div className="overflow-hidden border divide-y rounded-md divide-border">
        <ClassificationItem.Skeleton />
        <ClassificationItem.Skeleton />
        <ClassificationItem.Skeleton />
        <ClassificationItem.Skeleton />
        <ClassificationItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
