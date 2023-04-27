import {Icons} from '~/components/icons'

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: []
    }
)

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Matches',
      href: '/dashboard',
      icon: 'table',
    },
    {
      title: 'Classification',
      href: '/dashboard/classification',
      icon: 'trophy',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
}
