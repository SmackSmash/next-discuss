'use client';

import { useActionState } from 'react';
import { Input, Textarea, Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { createPost } from '@/actions';

export default function PostCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a post</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-stone-900'>
        <form action='' className='flex w-80 flex-col gap-4 p-4'>
          <h3 className='text-lg'>Create A Post</h3>
          <Input name='title' label='Title' labelPlacement='outside' placeholder='Title' />
          <Textarea name='content' label='Content' labelPlacement='outside' placeholder='Content' />
          <Button type='submit' color='primary'>
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
