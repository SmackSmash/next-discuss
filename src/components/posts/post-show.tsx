import { notFound } from 'next/navigation';
import { prisma } from '@/db';

type PostShowProps = {
  postId: string;
};

export default async function PostShow({ postId }: PostShowProps) {
  // Artificial loading delay. Remove later
  await new Promise(resolve => {
    setTimeout(resolve, 2500);
  });

  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  });

  if (!post) notFound();

  return (
    <div className='m-4'>
      <h1 className='my-2 text-2xl font-bold'>{post.title}</h1>
      <p className='rounded border p-4'>{post.content}</p>
    </div>
  );
}
