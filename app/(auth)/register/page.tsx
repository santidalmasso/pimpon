import Link from 'next/link'
import Image from 'next/image'
import {cn} from '~/lib/utils'
import {UserAuthForm} from '~/components/user-auth-form'
import {Icons} from '~/components/icons'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
    <div className="grid flex-col items-center justify-center w-screen h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn('absolute top-4 right-4 md:top-8 md:right-8')}
      >
        Login
      </Link>
      <div className="relative hidden h-full bg-slate-100 lg:block">
        <Image
          src={
            Math.random() > 0.5
              ? '/images/register-bg-1.jpg'
              : '/images/register-bg-2.jpg'
          }
          alt="Person playing ping pong"
          className="object-cover w-full h-full overflow-hidden"
          fill
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="w-10 h-10 mx-auto" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-sm text-center text-slate-500 dark:text-slate-400">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline hover:text-brand underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline hover:text-brand underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
