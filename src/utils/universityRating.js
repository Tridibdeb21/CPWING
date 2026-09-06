const DEFAULT_RATING = 1000
const STANDARD_K_FACTOR = 40
const PROVISIONAL_K_FACTOR = 60

const expectedScore = (rating, opponentRating) => (
  1 / (1 + (10 ** ((opponentRating - rating) / 400)))
)

const actualScore = (participant, opponents) => {
  if (opponents.length === 0) return 0.5

  const score = opponents.reduce((total, opponent) => {
    if (participant.rank < opponent.rank) return total + 1
    if (participant.rank === opponent.rank) return total + 0.5
    return total
  }, 0)

  return score / opponents.length
}

export function calculateUniversityRatings(participants) {
  if (!Array.isArray(participants) || participants.length === 0) return []

  return participants.map((participant, index) => {
    const opponents = participants.filter((_opponent, opponentIndex) => opponentIndex !== index)
    const rating = Number.isFinite(participant.rating) ? participant.rating : DEFAULT_RATING
    const expected = opponents.length === 0
      ? 0.5
      : opponents.reduce((total, opponent) => total + expectedScore(rating, opponent.rating ?? DEFAULT_RATING), 0) / opponents.length
    const actual = actualScore(participant, opponents)
    const kFactor = (participant.contestsCompleted ?? 0) < 3 ? PROVISIONAL_K_FACTOR : STANDARD_K_FACTOR
    const ratingChange = Math.round(kFactor * (actual - expected))

    return {
      ...participant,
      oldRating: rating,
      ratingChange,
      newRating: Math.max(0, rating + ratingChange),
      expectedScore: Number(expected.toFixed(4)),
      actualScore: Number(actual.toFixed(4)),
      kFactor
    }
  })
}