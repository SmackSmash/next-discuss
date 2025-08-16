'use client';

import { Input, Textarea, Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { createTopic } from '@/actions';
import { type FormEvent, startTransition, useActionState } from 'react';

export default function TopicCreateForm() {
  // State default defined here must be of same type returned by server action
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
            errorMessage={state.errors.name?.join(', ')}
          />
          <Textarea
            name='description'
            label='Description'
            labelPlacement='outside'
            placeholder='Describe your topic'
            isInvalid={!!state.errors.description}
            errorMessage={state.errors.description}
          />
          {state.errors._form && (
            <div className='text-red-500'>{state.errors._form.join(', ')}</div>
          )}
          <Button type='submit' color='primary'>
            {isPending ? 'Submitting Form' : 'Submit'}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
