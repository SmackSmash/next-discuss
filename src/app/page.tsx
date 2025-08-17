import { Divider } from '@heroui/divider';
import TopicCreateForm from '@/components/topics/topic-create-form';
import TopicList from '@/components/topics/topic-list';

export default function Home() {
  return (
    <div className='grid w-full grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='-m-2 text-xl'>Top Posts</h1>
      </div>
      <div className='rounded border border-stone-800 p-2'>
        <TopicCreateForm />
        <Divider className='my-2 bg-stone-800' />
        <h3 className='text-lg'>Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
