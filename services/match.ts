import {GET} from '~/app/api/matches/route'

export async function getMatches() {
  const response = await GET()
  if (!response.ok) throw new Error(response.statusText)
  const matches = await response.json()
  return matches ?? []
}
