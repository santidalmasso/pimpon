import {cn} from '~/lib/utils'
import {UserAvatar} from '~/components/user-avatar'
import {Skeleton} from '../ui/skeleton'
import {ConfirmRejectMatchButtons} from './confirm-match-button'

interface MatchItemProps {
  match: any
}

export function MatchItem({match}: MatchItemProps) {
  const [player1, player3] = match.players.filter(
    (player: any) => player.team === 'TeamA',
  )
  const [player2, player4] = match.players.filter(
    (player: any) => player.team === 'TeamB',
  )

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 gap-2 p-4 place-content-center text-slate-800',
          {
            'bg-yellow-50 text-yellow-800': match.status === 'Pending',
          },
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <UserAvatar user={player1} className="w-6 h-6 md:w-10 md:h-10" />
              <p className="text-xs md:text-base">{player1.name}</p>
            </div>
            {player3 ? (
              <div className="flex items-center gap-2">
                <UserAvatar
                  user={player3}
                  className="w-6 h-6 md:w-10 md:h-10"
                />
                <p className="text-xs md:text-base">{player3.name}</p>
              </div>
            ) : null}
          </div>
          <div
            className={cn('text-xs md:text-sm text-slate-600', {
              'text-green-500':
                match.teamAScore > match.teamBScore &&
                match.status !== 'Pending',
              'text-red-500':
                match.teamAScore < match.teamBScore &&
                match.status !== 'Pending',
            })}
          >
            {match.teamAScore}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn('text-xs md:text-sm text-slate-600', {
              'text-green-500':
                match.teamAScore < match.teamBScore &&
                match.status !== 'Pending',
              ' text-red-500':
                match.teamAScore > match.teamBScore &&
                match.status !== 'Pending',
            })}
          >
            {match.teamBScore}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-base">{player2.name}</p>
              <UserAvatar user={player2} className="w-6 h-6 md:w-10 md:h-10" />
            </div>
            {player4 ? (
              <div className="flex items-center gap-2">
                <p className="text-xs md:text-base">{player4.name}</p>
                <UserAvatar
                  user={player4}
                  className="w-6 h-6 md:w-10 md:h-10"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {match.status === 'Pending' && !match.createdByMe ? (
        <ConfirmRejectMatchButtons matchId={match.id} />
      ) : null}
    </>
  )
}

MatchItem.Skeleton = function MatchItemSkeleton() {
  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center w-full gap-4">
        <Skeleton className="w-6 h-6 rounded-full md:w-10 md:h-10" />
        <Skeleton className="w-2/5 h-5 md:h-6" />
      </div>
      <div className="flex items-center justify-end w-full gap-4">
        <Skeleton className="w-2/5 h-5 md:h-6" />
        <Skeleton className="w-6 h-6 rounded-full md:w-10 md:h-10" />
      </div>
    </div>
  )
}
