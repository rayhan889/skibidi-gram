import { memeSelectSchemaType } from '@/zod-schemas/meme'
import { LuLoaderCircle } from 'react-icons/lu'

import { MemeCard } from '@/components/MemeCard'

type MemesListProps = {
    memes: memeSelectSchemaType[]
    isLoading?: boolean
}

export default function MemesList({ memes, isLoading }: MemesListProps) {
  return (
    <section className='flex h-full flex-col'>
      {isLoading ? (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>Loading...</p>
          <LuLoaderCircle className='mr-2 h-5 w-5 animate-spin' />
        </div>
      ) : (
        <div className='py-3'>
          {memes?.map((meme, index) => <MemeCard key={index} data={meme} />)}
        </div>
      )}
    </section>
  )
}
