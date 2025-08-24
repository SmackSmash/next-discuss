import Image from 'next/image';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({ commentId, postId }: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find(c => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter(c => c.parentId === commentId);
  const renderedChildren = children.map(child => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  return (
    <div className='mt-2 mb-1 border p-4'>
      <div className='flex gap-3'>
        <Image
          src={comment.user.image || ''}
          alt='user image'
          width={40}
          height={40}
          className='h-10 w-10 rounded-full'
        />
        <div className='flex-1 space-y-3'>
          <p className='text-sm font-medium'>{comment.user.name}</p>
          <p>{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className='pl-4'>{renderedChildren}</div>
    </div>
  );
}
