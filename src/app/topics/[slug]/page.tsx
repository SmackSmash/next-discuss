import * as _ from 'lodash-es';
import PostCreateForm from '@/components/posts/post-create-form';

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='mb-2 text-2xl font-bold'>{_.capitalize(slug)}</h1>
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
