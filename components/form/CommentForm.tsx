'use client'

import { SendHorizontal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { User } from 'next-auth'
import {
  commentInsertSchemaType,
  commentSelectSchemaType
} from '@/zod-schemas/comment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

type CommentFormProps = {
  memeId: string
}

export default function CommentForm({ memeId }: CommentFormProps) {
  const { data: user } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [commentValue, setCommentValue] = useState('')

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [commentValue])

  const initial = user?.user.name?.match(/[A-Z]/g)?.join('')

  const { mutate: commentMeme, data: commentData } = useMutation({
    mutationFn: async () => {
      const payload: commentInsertSchemaType = {
        content: commentValue,
        memeId
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      const response = await fetch('/api/comment', requestOptions)
      const resultData = await response.json()
      return resultData as commentSelectSchemaType
    },
    onSuccess: data => {
      setCommentValue('')
      queryClient.invalidateQueries({ queryKey: ['memes'] })
      router.refresh()
    }
  })

  const handleComment = () => {
    commentMeme()
  }

  return (
    <div className='flex items-center justify-between gap-2'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={user?.user.image ?? ''} />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <textarea
        ref={textAreaRef}
        value={commentValue ?? ''}
        onChange={e => setCommentValue(e.target.value)}
        className='max-h-[150px] min-h-[20px] w-full resize-none overflow-hidden rounded-md border-none bg-transparent p-2 text-sm focus:outline-none focus-visible:ring-0'
        placeholder='Add a comment'
        rows={1}
      ></textarea>
      <Button variant={'secondary'} size={'sm'} onClick={handleComment}>
        <SendHorizontal size={16} />
      </Button>
    </div>
  )
}
