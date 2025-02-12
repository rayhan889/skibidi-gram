'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

export default function SearchResult() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  return <div>Search: {search}</div>
}
