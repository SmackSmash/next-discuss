import { Skeleton } from '@heroui/skeleton';

export default function PostShowLoading() {
  return (
    <div className='m-4'>
      <div className='my-2'>
        <Skeleton className='h-8 w-48' />
      </div>
      <div className='space-y-2 rounded border p-4'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-32' />
      </div>
    </div>
  );
}
