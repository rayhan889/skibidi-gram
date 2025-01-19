'use client'

import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
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
  const [filePreviews, setFilePreviews] = useState<
    (string | ArrayBuffer | null)[]
  >([])
  const [fileIndex, setFileIndex] = useState<number>(0)

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
    await uploadFiles('imageUploader', {
      files
    })
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const previews = acceptedFiles.map(file => {
        const reader = new FileReader()
        return new Promise<string | ArrayBuffer | null>(resolve => {
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })

      Promise.all(previews).then(loadedPreviews => {
        setFilePreviews(_ => [...loadedPreviews])
        form.setValue('files', acceptedFiles)
        console.log(acceptedFiles)
        onUploadFile([acceptedFiles[0]])
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

  const onSubmit = (data: memeInsertSchemaType) => {
    console.log(data)
    console.log('submitted')
  }

  const nextFile = () => {
    if (fileIndex + 1 === filePreviews.length) {
      setFileIndex(0)
    } else {
      setFileIndex(fileIndex + 1)
    }
  }

  const prevFile = () => {
    if (fileIndex - 1 === -1) {
      setFileIndex(filePreviews.length - 1)
    } else {
      setFileIndex(fileIndex - 1)
    }
  }

  const removeFile = (index: number) => {
    setFilePreviews(filePreviews.filter((_, i) => i !== index))
    form.setValue(
      'files',
      form.getValues('files').filter((_, i) => i !== index)
    )
  }

  const clearFormValue = () => {
    form.resetField('userId')
    form.resetField('title')
    form.resetField('files')
    setFilePreviews([])
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
                            className='absolute right-4 top-2 z-10 h-10 w-10 rounded-full bg-black/70 text-white shadow-sm'
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => removeFile(fileIndex)}
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
                      <>
                        <FiUploadCloud className='h-5 w-5' />
                        {isDragActive ? (
                          <p>Drop the image here!</p>
                        ) : (
                          <p>Click here or drag the image to upload it!</p>
                        )}
                      </>
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
            <Button onClick={() => clearFormValue()} variant={'outline'}>
              Reset
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
