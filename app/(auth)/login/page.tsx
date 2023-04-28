import {Metadata} from 'next'
import Link from 'next/link'
import {cn} from '~/lib/utils'
import {UserAuthForm} from '~/components/user-auth-form'
import {buttonVariants} from '~/components/ui/button'
import {Icons} from '~/components/icons'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({variant: 'ghost'}),
          'absolute top-4 left-4 md:top-8 md:left-8',
        )}
      >
        <>
          <Icons.chevronLeft className="w-4 h-4 mr-2" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full px-10 md:px-0 flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-sm text-center text-slate-500 dark:text-slate-400">
          <Link
            href="/register"
            className="underline hover:text-brand underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
