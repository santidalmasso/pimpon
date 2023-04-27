import * as z from 'zod'

export const createMatchSchema = z
  .object({
    player1: z.string(),
    player2: z.string(),
    player3: z.string().optional(),
    player4: z.string().optional(),
    teamAScore: z.number().min(0, 'Must be a positive number'),
    teamBScore: z.number().min(0, 'Must be a positive number'),
  })
  .refine(
    data => {
      return !(
        (data.player3 && !data.player4) ||
        (!data.player3 && data.player4)
      )
    },
    {
      message: 'Must have either 2 or 4 players',
      path: ['player3', 'player4'],
    },
  )
  .refine(
    data => {
      if (!data.player3 && !data.player4) {
        return data.player1 !== data.player2
      }
      return (
        data.player1 !== data.player2 &&
        data.player1 !== data.player3 &&
        data.player1 !== data.player4 &&
        data.player2 !== data.player3 &&
        data.player2 !== data.player4 &&
        data.player3 !== data.player4
      )
    },
    {
      message: 'Players must all be different',
      path: ['player1', 'player2', 'player3', 'player4'],
    },
  )
  .refine(
    data => {
      const scoreDifference = Math.abs(data.teamAScore - data.teamBScore)
      const maxScore = Math.max(data.teamAScore, data.teamBScore)

      if (
        (maxScore >= 21 && scoreDifference === 2) ||
        (maxScore === 21 && scoreDifference >= 2) ||
        (maxScore === 7 && scoreDifference === 7)
      ) {
        return true
      }
      return false
    },
    {
      message:
        'Scores must follow ping-pong rules: A game must be won with at least 21 points and a minimum 2-point lead',
      path: ['player1_score', 'player2_score'],
    },
  )
