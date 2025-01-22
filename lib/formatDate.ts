export function formatDate(inputDate: string): string {
  const now = new Date()
  const date = new Date(inputDate)
  const differenceInMs = now.getTime() - date.getTime()
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60))
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60))
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  if (differenceInMinutes < 5) {
    return 'Recently'
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`
  } else if (differenceInHours < 24) {
    return `${differenceInHours} hours ago`
  } else if (differenceInDays < 2) {
    return 'Yesterday'
  } else if (differenceInDays < 365) {
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`
  } else {
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
  }
}
