import { SearchResultType } from './SearchResult'

import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MemeCard } from '@/components/MemeCard'

type TopContentProps = {
  searchData: SearchResultType
}

export default function TopContent({ searchData }: TopContentProps) {
  return (
    <div className='flex h-full w-full flex-col gap-y-2'>
      {searchData.users.length == 0 && searchData.memes.length == 0 && (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>No results found</p>
        </div>
      )}
      {searchData.users.length > 0 && (
        <>
          <h2 className='text-lg font-medium'>People</h2>
          <div className='flex w-full flex-col justify-start gap-1'>
            {searchData.users.slice(0, 3).map((user, index) => {
              const initial = user.name.match(/[A-Z]/g)?.join('')
              return (
                <div
                  key={index}
                  className='flex items-center justify-between py-3'
                >
                  <div className='flex items-center gap-2'>
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-semibold'>{user.name}</h4>
                      <span className='text-sm text-muted-foreground'>
                        {user.username}
                      </span>
                      {user.bio && <p className='text-sm'>{user.bio}</p>}
                    </div>
                  </div>
                </div>
              )
            })}
            {searchData.users.length > 3 && (
              <Button className='w-1/6' variant={'link'}>
                View All
              </Button>
            )}
          </div>
        </>
      )}
      {searchData.memes.length > 0 && searchData.users.length > 0 && <hr />}
      {searchData.memes.length > 0 && (
        <div>
          {searchData.memes.map((meme, index) => (
            <MemeCard key={index} data={meme} />
          ))}
        </div>
      )}
    </div>
  )
}
