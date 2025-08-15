'use client';

import { Input, Textarea, Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { createTopic } from '@/actions';
import { type FormEvent, startTransition, useActionState } from 'react';

export default function TopicCreateForm() {
  const [state, formAction, isPending] = useActionState(createTopic, {
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
        <Button color='primary'>Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-stone-900'>
        <form onSubmit={handleSubmit} className='flex w-80 flex-col gap-4 p-4'>
          <h3>Create a Topic</h3>
          <Input
            name='name'
            label='Name'
            labelPlacement='outside'
            placeholder='Name'
            isInvalid={!!state.errors.name}
            errorMessage={state.errors.name}
          />
          <Textarea
            name='description'
            label='Description'
            labelPlacement='outside'
            placeholder='Describe your topic'
            isInvalid={!!state.errors.description}
            errorMessage={state.errors.description}
          />
          <Button type='submit' color='primary'>
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
