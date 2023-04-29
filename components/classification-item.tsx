import {cn} from '~/lib/utils'
import {UserAvatar} from '~/components/user-avatar'
import {User} from '@prisma/client'
import {Icons} from '~/components/icons'
import {Skeleton} from '~/components/ui/skeleton'

interface ClassificationItemProps {
  user: any
}

export function ClassificationItem({user}: ClassificationItemProps) {
  return (
    <div
      className={cn(
        'flex justify-between gap-2 px-4 py-3 sm:py-4 items-center text-slate-800',
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <p className="flex items-center gap-2 font-bold">{user.position}</p>
        <UserAvatar user={user} className="w-6 h-6 md:w-10 md:h-10" />
        <p className="text-sm md:text-base">{user.name}</p>
        {[1, 2, 3].includes(user.position) ? (
          <Icons.medal
            className={cn('h-5', {
              'text-yellow-500': user.position === 1,
              'text-zinc-400': user.position === 2,
              'text-yellow-800': user.position === 3,
            })}
          />
        ) : null}
      </div>
      <div className="flex flex-col items-end text-xs md:text-sm">
        <p>
          <span className="font-medium text-slate-400">Matches:</span>{' '}
          {user.matches}
        </p>
        <p>
          <span className="font-medium text-slate-400">Elo:</span>{' '}
          {Math.round(user.eloRating)}
        </p>
      </div>
    </div>
  )
}

ClassificationItem.Skeleton = function ClassificationItemSkeleton() {
  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center w-full gap-4">
        <Skeleton className="w-3 h-5" />
        <Skeleton className="w-6 h-6 rounded-full md:w-10 md:h-10" />
        <Skeleton className="w-2/5 h-5 md:h-6" />
      </div>
      <div className="flex flex-col items-end gap-1">
        <Skeleton className="w-20 h-3 md:h-5" />
        <Skeleton className="w-16 h-3 md:h-5" />
      </div>
    </div>
  )
}
