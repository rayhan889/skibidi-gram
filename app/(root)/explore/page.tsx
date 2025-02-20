import { getAuthSession } from '@/lib/auth'

import SearchResult from './SearchResult'

import { Searchbar } from '@/components/Searchbar'

export default async function ExplorePage() {
  const session = await getAuthSession()

  if (!session?.user) {
    return <div>You are not logged in</div>
  }

  return (
    <section className='h-full space-y-8 p-3'>
      <Searchbar />
      <SearchResult />
    </section>
  )
}
