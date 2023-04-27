import '~/styles/globals.css'
import {Toaster} from '~/components/ui/toaster'
import {cn} from '../lib/utils'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'
import {siteConfig} from '../config/site'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
})

export const metadata = {
  title: 'PimPon',
  description: 'Aplicación de ping pong',
  authors: [
    {
      name: 'Santi Dalmasso',
      url: 'https://santid.me',
    },
  ],
  creator: 'santid',
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={cn('font-sans', fontSans.variable, fontHeading.variable)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
