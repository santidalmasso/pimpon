'use client'

import {use} from 'react'
import {Option, Options} from '~/components/ui/combobox'
import {Player} from '~/types/player'

const cache = new Map()

async function getPlayers(query: string): Promise<Player[]> {
  if (cache.has(query)) {
    return cache.get(query)
  }
  const res = await fetch(`/api/players?query=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to fetch players')
  const players = await res.json()
  cache.set(query, players)
  return players
}

export function SearchPlayers({query}: {query: string}) {
  if (query === '') {
    return null
  }

  const players = use(getPlayers(query))

  if (players.length === 0) {
    return (
      <Options>
        <Option value="no-matches" disabled>
          No matches for <i>&quot;{query}&quot;</i>
        </Option>
      </Options>
    )
  }
  return (
    <Options>
      {players.map(player => (
        <Option value={player} key={player.name}>
          {player.name}
        </Option>
      ))}
    </Options>
  )
}
