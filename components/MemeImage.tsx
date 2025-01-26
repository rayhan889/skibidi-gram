'use client'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
  file: {
    fileName: string
    fileType: string
    path: string
  }
  isDisplayFull?: boolean
  isLast?: boolean
  memeId?: string
  username?: string
  fileIndex?: number
}

export const MemeImage = ({
  file,
  isDisplayFull,
  isLast,
  memeId,
  username,
  fileIndex
}: Props) => {
  const formattedName = username?.replace(/\s+/g, '_')

  let index = 1
  if (fileIndex) index += fileIndex

  return (
    <Link
      href={`/${formattedName}/memes/${memeId}/image/${index}`}
      className={`${isDisplayFull && 'col-span-2'} relative`}
    >
      {isLast && (
        <div className='absolute flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-black/65'>
          <span className='text-xl font-medium text-white'>+ 1</span>
        </div>
      )}
      <Image
        width={100}
        height={100}
        src={file.path}
        alt={file.fileName}
        className='h-[10rem] w-full cursor-pointer rounded-md object-cover md:h-[16rem]'
        loading='lazy'
      />
    </Link>
  )
}
