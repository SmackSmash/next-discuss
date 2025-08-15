import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

export default function TopicCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent className='bg-stone-900'>
        <form className='flex w-80 flex-col gap-4 p-4'>
          <h3>Create a Topic</h3>
          <Input label='Name' labelPlacement='outside' placeholder='Name' />
          <Textarea
            label='Description'
            labelPlacement='outside'
            placeholder='Describe your topic'
          />
          <Button type='submit' color='primary'>
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
