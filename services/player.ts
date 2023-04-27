import {GET} from '~/app/api/players/top/route'

export async function getTopPlayers() {
  const response = await GET()
  if (!response.ok) throw new Error(response.statusText)
  const matches = await response.json()
  return matches ?? []
}
