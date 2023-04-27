interface EloRatings {
  player1Rating: number
  player2Rating: number
  player3Rating?: number
  player4Rating?: number
}

function calculateEloRatings({
  player1ActualElo,
  player2ActualElo,
  player3ActualElo,
  player4ActualElo,
  teamAScore,
  teamBScore,
  kFactor = 32,
}: {
  player1ActualElo: number
  player2ActualElo: number
  player3ActualElo: number | null
  player4ActualElo: number | null
  teamAScore: number
  teamBScore: number
  kFactor?: number
}): EloRatings {
  const getExpectedScore = (ratingA: number, ratingB: number) =>
    1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))

  const calculateNewRating = (
    oldRating: number,
    actualScore: number,
    expectedScore: number,
  ) => oldRating + kFactor * (actualScore - expectedScore)

  const result =
    teamAScore > teamBScore ? 1 : teamAScore === teamBScore ? 0.5 : 0

  const player1Expected = getExpectedScore(player1ActualElo, player2ActualElo)
  const player2Expected = getExpectedScore(player2ActualElo, player1ActualElo)

  const player1NewRating = calculateNewRating(
    player1ActualElo,
    result,
    player1Expected,
  )
  const player2NewRating = calculateNewRating(
    player2ActualElo,
    1 - result,
    player2Expected,
  )

  const player3NewRating = player3ActualElo
    ? calculateNewRating(player3ActualElo, result, player1Expected)
    : undefined
  const player4NewRating = player4ActualElo
    ? calculateNewRating(player4ActualElo, 1 - result, player2Expected)
    : undefined

  return {
    player1Rating: player1NewRating,
    player2Rating: player2NewRating,
    player3Rating: player3NewRating,
    player4Rating: player4NewRating,
  }
}

export {calculateEloRatings}
