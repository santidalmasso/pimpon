import Link from 'next/link'
import {cn} from '~/lib/utils'
import {buttonVariants} from '~/components/ui/button'
import {siteConfig} from '~/config/site'
import {Icons} from '~/components/icons'

export default function Home() {
  return (
    <main className="grid w-full px-10 pt-20 pb-20 space-y-6 place-content-center text-slate-900 md:pb-12 md:pt-32 lg:py-40">
      <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Icons.logo className="w-16 h-16 mb-6 md:mb-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
        <h1 className="text-3xl font-semibold font-heading sm:text-5xl md:text-6xl lg:text-7xl">
          The best application to keep track of your ping pong games
        </h1>
        <p className="my-4 max-w-[42rem] leading-normal text-slate-600 sm:text-xl sm:leading-8">
          Compete with friends and fellow players with our app! Pimpon is a
          platform designed for passionate players looking to take their game to
          the next level and track their progress over time.
        </p>
        <div className="space-x-4">
          <Link href="/login" className={cn(buttonVariants({size: 'lg'}))}>
            Get Started
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({variant: 'outline', size: 'lg'}))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </main>
  )
}
