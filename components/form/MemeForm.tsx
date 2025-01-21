'use client'

import { useForm } from 'react-hook-form'
import React, { useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type memeInsertSchemaType, memeInsertSchema } from '@/zod-schemas/meme'
import {
  FiUploadCloud,
  FiChevronRight,
  FiChevronLeft,
  FiTrash
} from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import type { User } from 'next-auth'
import { uploadFiles } from '@/lib/uploadthing'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { LuLoaderCircle } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function MemeForm({
  user
}: {
  user: User & { id: string; username?: string | null | undefined }
}) {
  const router = useRouter()

  const [filePreviews, setFilePreviews] = useState<
    (string | ArrayBuffer | null)[]
  >([])
  const [fileIndex, setFileIndex] = useState<number>(0)
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false)

  const defaultValues: memeInsertSchemaType = {
    title: '',
    files: [],
    userId: user.id
  }

  const form = useForm<memeInsertSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(memeInsertSchema),
    defaultValues
  })

  const onUploadFile = async (files: File[]) => {
    setIsImageUploading(true)
    const result = await uploadFiles('imageUploader', {
      files
    })

    setIsImageUploading(false)

    return result.map(file => file.url)
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const previews = acceptedFiles.map(file => {
        const reader = new FileReader()
        return new Promise<string | ArrayBuffer | null>(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })

      const uploadedFileUrls = await onUploadFile(acceptedFiles)

      const fileWithUpdatedUrls = acceptedFiles.map((file, index) => ({
        file,
        fileName: file.name,
        fileType: file.type,
        path: uploadedFileUrls[index]
      }))
      Promise.all(previews).then(loadedPreviews => {
        setFilePreviews(_ => [...loadedPreviews])
        form.setValue('files', fileWithUpdatedUrls)
        form.clearErrors('files')
      })
    },
    [form, onUploadFile]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 5,
      maxSize: 1000000, // 10MB
      accept: { 'image/*': ['.jpg', '.png', '.jpeg'] }
    })

  const onSubmit = () => {
    createMeme()
  }

  const { mutate: createMeme, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const files = form.getValues('files').map(file => ({
        fileName: file.fileName,
        fileType: file.fileType,
        path: file.path
      }))

      const payload: memeInsertSchemaType = {
        title: form.getValues('title'),
        files,
        userId: user.id
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
      const response = await fetch('/api/meme', requestOptions)
      const data = await response.json()
      return data as memeInsertSchemaType & { id: string }
    },
    onError: err => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      })
    },
    onSuccess: data => {
      router.push('/home')
    }
  })

  const nextFile = (e: React.MouseEvent) => {
    e.preventDefault()
    if (fileIndex + 1 === filePreviews.length) {
      setFileIndex(0)
    } else {
      setFileIndex(fileIndex + 1)
    }
  }

  const prevFile = (e: React.MouseEvent) => {
    e.preventDefault()
    if (fileIndex === 0) {
      setFileIndex(filePreviews.length - 1)
    } else {
      setFileIndex(fileIndex - 1)
    }
  }

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setFilePreviews(filePreviews.filter((_, i) => i !== index))
    form.setValue(
      'files',
      form.getValues('files').filter((_, i) => i !== index)
    )

    const newFilePreviews = filePreviews.filter((_, i) => i !== index)
    if (newFilePreviews.length === 0) {
      setFileIndex(0)
    } else if (fileIndex === index) {
      setFileIndex(prevIndex =>
        prevIndex === newFilePreviews.length ? prevIndex - 1 : prevIndex
      )
    } else if (fileIndex > index) {
      setFileIndex(fileIndex - 1)
    }
  }

  const clearFormValue = () => {
    form.reset(defaultValues)
    setFilePreviews([])
    setFileIndex(0)
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-4'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Kai cenat🗣️' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='files'
            render={() => (
              <FormItem>
                <FormLabel
                  className={`${fileRejections.length !== 0 && 'text-destructive'}`}
                >
                  Image
                  <span
                    className={
                      form.formState.errors.files || fileRejections.length !== 0
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }
                  ></span>
                </FormLabel>
                {filePreviews.length > 0 ? (
                  <div className='custom-scroll relative h-full max-h-[540px] w-full overflow-x-auto rounded-md shadow-sm'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type='button'
                            className='absolute left-4 top-1/2 z-10 h-10 w-10 rounded-full bg-black/70 text-white shadow-sm'
                            size={'icon'}
                            variant={'ghost'}
                            onClick={prevFile}
                          >
                            <span className='sr-only'>Previous</span>
                            <FiChevronLeft
                              style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Previous</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type='button'
                            className='absolute right-4 top-2 z-10 h-10 w-10 rounded-full bg-black/70 text-white shadow-sm'
                            size={'icon'}
                            variant={'ghost'}
                            onClick={e => removeFile(e, fileIndex)}
                          >
                            <span className='sr-only'>Remove</span>
                            <FiTrash
                              style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <img
                      src={filePreviews[fileIndex] as string}
                      alt='image_attachment'
                      className='h-full w-full rounded-md object-cover'
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type='button'
                            className='absolute right-4 top-1/2 z-10 h-10 w-10 rounded-full bg-black/70 text-white shadow-sm'
                            size={'icon'}
                            variant={'ghost'}
                            onClick={nextFile}
                          >
                            <span className='sr-only'>Next</span>
                            <FiChevronRight
                              style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Next</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`custom-scroll flex ${filePreviews.length == 0 ? 'h-[10rem] p-5' : ''} max-h-80 w-full cursor-pointer items-center justify-center space-x-2 overflow-y-hidden rounded-md border border-dashed border-input bg-transparent text-sm text-gray-400 shadow-sm`}
                    >
                      {isImageUploading ? (
                        <>
                          <LuLoaderCircle className='mr-2 h-5 w-5 animate-spin' />
                          <p>Uploading...</p>
                        </>
                      ) : (
                        <>
                          <FiUploadCloud className='h-5 w-5' />
                          {isDragActive ? (
                            <p>Drop the image here!</p>
                          ) : (
                            <p>Click here or drag the image to upload it!</p>
                          )}
                        </>
                      )}
                      <Input {...getInputProps()} type='file' />
                    </div>
                  </FormControl>
                )}
                <FormMessage>
                  {fileRejections.length !== 0 && (
                    <p>
                      Image must be less than 1MB and of type png, jpg, or jpeg
                    </p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className='flex w-full items-center justify-end space-x-3'>
            <Button
              type='button'
              onClick={() => clearFormValue()}
              variant={'outline'}
              disabled={
                form.formState.isSubmitting || isLoading || isImageUploading
              }
            >
              Reset
            </Button>
            <Button
              type='submit'
              disabled={
                form.formState.isSubmitting || isLoading || isImageUploading
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
