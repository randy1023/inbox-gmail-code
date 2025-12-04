import { CustomLoading } from './CustomLoading'

export const CustomFullScreenLoading = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <CustomLoading />
      </div>
    </div>
  )
}
