import { userSelechWithExtrasSchemaType } from '@/zod-schemas/user'

import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'

type PeopleContentProps = {
  users: userSelechWithExtrasSchemaType[]
}

export default function PeopleContent({ users }: PeopleContentProps) {
  return (
    <div className='flex h-full w-full flex-col gap-y-2'>
      {users.length == 0 && (
        <div className='flex h-full items-center justify-center space-x-2 text-muted-foreground'>
          <p>No results found</p>
        </div>
      )}
      {users.length > 0 && (
        <div className='flex w-full flex-col justify-start gap-1'>
          {users.map((user, index) => {
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
        </div>
      )}
    </div>
  )
}
