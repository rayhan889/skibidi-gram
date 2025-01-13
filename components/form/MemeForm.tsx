'use client'

import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type memeInsertSchemaType, memeInsertSchema } from '@/zod-schemas/meme'
import { FiUploadCloud } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { type KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

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

export default function MemeForm({
  user
}: {
  user: KindeUser<Record<string, any>>
}) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')

  const defaultValues: memeInsertSchemaType = {
    title: '',
    body: new File([''], 'filename'),
    userId: user.id
  }

  const form = useForm<memeInsertSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(memeInsertSchema),
    defaultValues
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('body', acceptedFiles[0])
        form.clearErrors('body')
      } catch (error) {
        setPreview(null)
        form.resetField('body')
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000, // 100MB
      accept: { 'image/*': ['.jpg', '.png', '.jpeg'] }
    })

  const onSubmit = (data: memeInsertSchemaType) => {
    console.log(data)
    console.log('submitted')
  }

  function clearFormValue() {
    form.resetField('id')
    form.resetField('userId')
    form.resetField('title')
    form.resetField('body')
    form.resetField('createdAt')
    form.resetField('updatedAt')
    setPreview('')
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
            name='body'
            render={() => (
              <FormItem>
                <FormLabel
                  className={`${fileRejections.length !== 0 && 'text-destructive'}`}
                >
                  Image
                  <span
                    className={
                      form.formState.errors.body || fileRejections.length !== 0
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }
                  ></span>
                </FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className='custom-scroll flex h-auto max-h-80 w-full cursor-pointer items-center justify-center space-x-2 overflow-y-auto rounded-md border border-dashed border-input bg-transparent p-5 text-sm text-gray-400 shadow-sm'
                  >
                    {preview && (
                      <img
                        src={preview as string}
                        alt='image_attachment'
                        className='h-full w-full rounded-md object-cover'
                      />
                    )}
                    <Input {...getInputProps()} type='file' />
                    {!preview && (
                      <>
                        <FiUploadCloud className='h-5 w-5' />
                        {isDragActive ? (
                          <p>Drop the image here!</p>
                        ) : (
                          <p>Click here or drag the image to upload it!</p>
                        )}
                      </>
                    )}
                  </div>
                </FormControl>
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
