'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@heroui/react';
import { createComment } from '@/actions';

type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

export default function CommentCreateForm({ postId, parentId, startOpen }: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className='space-y-2 px-1'>
        <Textarea
          name='content'
          label='Reply'
          placeholder='Enter your comment'
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />

        {formState.errors._form ? (
          <div className='rounded border border-red-400 bg-red-200 p-2'>
            {formState.errors._form?.join(', ')}
          </div>
        ) : null}

        <Button isLoading={isPending} type='submit'>
          Create Comment
        </Button>
      </div>
    </form>
  );

  return (
    <div>
      <Button size='sm' onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
