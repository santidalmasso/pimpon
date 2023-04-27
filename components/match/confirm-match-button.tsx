'use client'

import {useRouter} from 'next/navigation'
import {cn} from '~/lib/utils'
import {buttonVariants} from '~/components/ui/button'
import {useState} from 'react'

interface ConfirmMatchButtonProps {
  matchId: string
}

export function ConfirmRejectMatchButtons({matchId}: ConfirmMatchButtonProps) {
  const {refresh} = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    await fetch(`/api/matches/${matchId}/confirm`, {
      method: 'POST',
    })
      .then(res => {
        if (res.ok) refresh()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleReject = async () => {
    setIsLoading(true)
    await fetch(`/api/matches/${matchId}/reject`, {
      method: 'POST',
    })
      .then(res => {
        if (res.ok) refresh()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="flex justify-center gap-10">
      <button
        disabled={isLoading}
        className={cn(
          buttonVariants({variant: 'link'}),
          'my-2 h-6 text-green-800',
        )}
        onClick={handleConfirm}
      >
        Confirm
      </button>
      <button
        disabled={isLoading}
        className={cn(
          buttonVariants({variant: 'link'}),
          'my-2 h-6 text-red-800',
        )}
        onClick={handleReject}
      >
        Reject
      </button>
    </div>
  )
}
