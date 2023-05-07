import {redirect} from 'next/navigation'

import {authOptions} from '~/lib/auth'
import {getCurrentUser} from '~/lib/session'
import {DashboardHeader, DashboardShell} from '~/components/dashboard'
import {ClassificationItem} from '../../../components/classification-item'
import {getTopPlayers} from '../../../services/player'
import DashboardLoading from './loading'

export const metadata = {
  title: 'Classification',
}

export default async function ClassificationPage() {
  const [me, topPlayers] = await Promise.all([
    getCurrentUser(),
    getTopPlayers(),
  ])

  if (!me) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Classification" text="Top players" />
      <div>
        {topPlayers.length === 0 ? null : (
          <ul className="overflow-hidden border divide-y rounded-md divide-border">
            {topPlayers.map((user: any) => (
              <li key={user.id}>
                <ClassificationItem user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardShell>
  )
}
