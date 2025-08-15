import TopicCreateForm from '@/components/topics/topic-create-form';

export default function Home() {
  return (
    <div className='grid w-full grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='-m-2 text-xl'>Top Posts</h1>
      </div>
      <TopicCreateForm />
    </div>
  );
}
