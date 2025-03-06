import { memeSelectSchemaType } from '@/zod-schemas/meme'

import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MemeCard } from '@/components/MemeCard'

type MemeContentProps = {
  memes: memeSelectSchemaType[]
}

export default function MemeContent({ memes }: MemeContentProps) {
  return (
    <div className='flex h-full w-full flex-col gap-y-2'>
      {memes.length == 0 && (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>No results found</p>
        </div>
      )}
      {memes.length > 0 && (
        <div>
          {memes.map((meme, index) => (
            <MemeCard key={index} data={meme} />
          ))}
        </div>
      )}
    </div>
  )
}
