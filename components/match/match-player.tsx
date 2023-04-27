import {useFormContext} from 'react-hook-form'
import {UserAvatar} from '~/components/user-avatar'
import {cn} from '~/lib/utils'
import {
  Combobox,
  Options,
  Option,
  ComboboxInput,
} from '~/components/ui/combobox'
import {Suspense, useState} from 'react'
import {SearchPlayers} from '~/components/match/search-players'
import {useDebounce} from '../../hooks/use-debounce'
import {Player} from '~/types/player'

interface MatchPlayerProps {
  name: string
  className?: string
}

const MatchPlayer = ({className, name}: MatchPlayerProps) => {
  const {
    setValue,
    formState: {errors},
  } = useFormContext()
  const [query, setQuery] = useState('')
  const [player, setPlayer] = useState<Player | null>(null)
  const debouncedQuery = useDebounce(query, 500)

  function handleSelect(player: Player) {
    setPlayer(player)
    setValue(name, player.id)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <div className="flex items-center gap-2">
        <UserAvatar
          user={player ?? {name: '', image: null}}
          className="w-8 h-8"
        />
        <Combobox as="div" onChange={handleSelect}>
          <ComboboxInput
            onChange={(event: any) => setQuery(event.target.value)}
            displayValue={(player: Player) => player.name}
          />
          <Suspense
            key={debouncedQuery}
            fallback={
              <Options>
                <Option value="disabled" disabled>
                  Loading...
                </Option>
              </Options>
            }
          >
            <SearchPlayers query={debouncedQuery} />
          </Suspense>
        </Combobox>
      </div>
      {errors?.[name] ? (
        <p role="alert" className="px-1 text-xs text-red-600">
          {errors?.[name]?.message || 'Validation error'}
        </p>
      ) : null}
    </div>
  )
}

MatchPlayer.displayName = 'MatchPlayer'

export {MatchPlayer}
