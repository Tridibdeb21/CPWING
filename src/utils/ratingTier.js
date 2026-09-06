const ratingTiers = [
  { name: 'Newbie', min: 0, color: '#9aa4ad' },
  { name: 'Pupil', min: 1200, color: '#55b85a' },
  { name: 'Specialist', min: 1400, color: '#28b9c7' },
  { name: 'Expert', min: 1600, color: '#5b8def' },
  { name: 'Candidate Master', min: 1900, color: '#b36bdf' },
  { name: 'Master', min: 2100, color: '#f3a633' },
  { name: 'Grandmaster', min: 2300, color: '#f05b5b' },
  { name: 'International GM', min: 2600, color: '#f05b9a' },
  { name: 'Legendary GM', min: 3000, color: '#f05b5b' }
]

export function getRatingTier(rating) {
  const numericRating = Number.isFinite(Number(rating)) ? Number(rating) : 0
  return [...ratingTiers].reverse().find((tier) => numericRating >= tier.min) ?? ratingTiers[0]
}