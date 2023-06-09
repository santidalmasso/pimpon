'use client'

import * as React from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormProvider, useForm} from 'react-hook-form'
import * as z from 'zod'
import {cn} from '~/lib/utils'
import {createMatchSchema} from '~/lib/validations/match'
import {Label} from '~/components/ui/label'
import {User} from 'next-auth'
import {buttonVariants} from '../ui/button'
import {MatchPlayer} from '~/components/match/match-player'
import {Card} from '~/components/ui/card'
import {Input} from '~/components/ui/input'
import {Icons} from '~/components/icons'
import {toast} from '~/hooks/use-toast'
import {useRouter} from 'next/navigation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof createMatchSchema>

interface CreateDoublesMatchFormProps extends UserAuthFormProps {
  user: Pick<User, 'image' | 'name'>
}

export function CreateDoublesMatchForm({
  user,
  className,
  ...props
}: CreateDoublesMatchFormProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(createMatchSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const {push} = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const createMatchResult = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setIsLoading(false)

    if (!createMatchResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Cannot create match. Please try again.',
        variant: 'destructive',
      })
    }

    toast({
      title: 'Match created.',
      description: 'We sent match to your opponent to confirm.',
    })
    return push('/dashboard')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <FormProvider {...methods}>
        <form className="grid gap-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 place-content-center">
            <Card className="flex flex-col gap-6 p-4">
              <MatchPlayer name="player1" />
              <MatchPlayer name="player3" />
              <Label className="sr-only" htmlFor="team-a-points">
                Points
              </Label>
              <Input
                id="team-a-points"
                placeholder="Points"
                type="number"
                step={1}
                min={0}
                autoCapitalize="none"
                autoCorrect="off"
                {...methods.register('teamAScore', {
                  valueAsNumber: true,
                })}
              />
            </Card>
            <Card className="flex flex-col gap-6 p-4">
              <MatchPlayer name="player2" />
              <MatchPlayer name="player4" />
              <Label className="sr-only" htmlFor="team-b-points">
                Points
              </Label>
              <Input
                id="team-b-points"
                placeholder="Points"
                type="number"
                step={1}
                min={0}
                autoCapitalize="none"
                autoCorrect="off"
                {...methods.register('teamBScore', {
                  valueAsNumber: true,
                })}
              />
            </Card>
          </div>
          {
            // @ts-expect-error type
            methods.formState.errors?.player1_score ||
            // @ts-expect-error type
            methods.formState.errors?.player2_score ? (
              <p role="alert" className="px-1 text-xs text-red-600">
                Scores must follow ping-pong rules: A game must be won with at
                least 21 points and a minimum 2-point lead
              </p>
            ) : null
          }
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Match
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
