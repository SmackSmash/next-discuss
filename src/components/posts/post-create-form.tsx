'use client';

import { FormEvent, useActionState, startTransition } from 'react';
import { Input, Textarea, Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { createPost } from '@/actions';

export default function PostCreateForm() {
  const [state, formAction, isPending] = useActionState(createPost, {
    errors: {}
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a post</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-stone-900'>
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-4 p-4'>
          <h3 className='text-lg'>Create A Post</h3>
          <Input
            name='title'
            label='Title'
            labelPlacement='outside'
            placeholder='Title'
            isInvalid={!!state.errors.title}
            errorMessage={state.errors.title}
          />
          <Textarea
            name='content'
            label='Content'
            labelPlacement='outside'
            placeholder='Content'
            isInvalid={!!state.errors.content}
            errorMessage={state.errors.content}
          />
          <Button type='submit' color='primary' isLoading={isPending}>
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
