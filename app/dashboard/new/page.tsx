import {redirect} from 'next/navigation'

import {authOptions} from '~/lib/auth'
import {getCurrentUser} from '~/lib/session'
import {DashboardHeader, DashboardShell} from '~/components/dashboard'
import {CreateSinglesMatchForm} from '~/components/match/create-singles-match-form'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs'
import {CreateDoublesMatchForm} from '~/components/match/create-doubles-match-form'

export const metadata = {
  title: 'New Match',
}

export default async function NewMatchPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create a match" text="Create a match." />
      <Tabs defaultValue="singles" className="max-w-xl">
        <TabsList>
          <TabsTrigger value="singles">Singles</TabsTrigger>
          <TabsTrigger value="doubles">Doubles</TabsTrigger>
        </TabsList>
        <TabsContent value="singles">
          <CreateSinglesMatchForm user={user} />
        </TabsContent>
        <TabsContent value="doubles">
          <CreateDoublesMatchForm user={user} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
