const readMessagesKey = (userId) => `cpwing-read-messages:${userId}`

export const getReadMessageIds = (userId) => {
  if (!userId) return new Set()

  try {
    const stored = JSON.parse(localStorage.getItem(readMessagesKey(userId)) || '[]')
    return new Set(Array.isArray(stored) ? stored : [])
  } catch {
    return new Set()
  }
}

export const markMessagesRead = (userId, messageIds) => {
  if (!userId || messageIds.length === 0) return

  const readIds = getReadMessageIds(userId)
  messageIds.forEach((id) => readIds.add(id))
  localStorage.setItem(readMessagesKey(userId), JSON.stringify([...readIds]))
  window.dispatchEvent(new CustomEvent('cpwing:messages-read', { detail: { userId } }))
}
