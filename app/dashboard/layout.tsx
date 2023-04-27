import {notFound} from 'next/navigation'
import {getCurrentUser} from '~/lib/session'
import {UserAccountNav} from '~/components/user-account-nav'
import {dashboardConfig} from '~/config/dashboard'
import {DashboardNav} from '~/components/nav'
import {Icons} from '~/components/icons'
import Link from 'next/link'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex flex-col mx-auto space-y-6">
      <header className="sticky top-0 z-40 bg-white border-b border-b-slate-200">
        <div className="flex items-center justify-between h-16 px-4 py-4 mx-auto md:px-10 max-w-7xl">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <Icons.logo />
              <p>PimPon</p>
            </div>
          </Link>
          <UserAccountNav user={user} />
        </div>
      </header>
      <div className="max-w-7xl w-full px-4 md:px-8 mx-auto grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
