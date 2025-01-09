import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Home() {
  const mockData = [
    {
      id: 1,
      title: 'Meme 1',
      username: 'Reynard',
      body: 'https://utfs.io/f/kMVf4fq06TC3VzGWUlYOM0zl671Eog5kw4njLcT2pAtIySZC'
    },
    {
      id: 2,
      title: '🙀',
      username: 'John',
      body: 'https://utfs.io/f/kMVf4fq06TC3dS1vWiFHtvMVeTj18Qshlid93fbD2KgucPNW'
    }
  ]

  return (
    <section className='container mx-auto h-screen max-w-screen-2xl'>
      <div className='grid h-screen grid-cols-3 gap-4'>
        <section className='hidden h-full w-full lg:block'>Left</section>
        <section className='col-span-3 flex h-full w-full flex-col border border-slate-200 md:columns-2 lg:col-span-1'>
          <div className='py-3'>
            {[...mockData, ...mockData, ...mockData].map((meme, index) => (
              <div
                key={index}
                className='flex w-full gap-x-2 border-b border-b-slate-200 p-3'
              >
                <Avatar className='mt-[0.3rem]'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex w-full flex-col gap-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='block'>
                      <div className='flex items-center gap-x-2'>
                        <h4 className='font-bold'>{meme.username}</h4>
                        <span className='h-1 w-1 rounded-full bg-gray-400'></span>
                        <span className='text-sm text-gray-700'>
                          15 hours ago
                        </span>
                      </div>
                      <span className='text-gray-700'>{meme.title}</span>
                    </div>
                    {/* Actions */}
                  </div>
                  <img
                    src={meme.body}
                    alt={meme.username}
                    className='h-full max-h-[20rem] w-full rounded-md object-cover'
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='hidden h-full w-full md:block'>Right</section>
      </div>
    </section>
  )
}
