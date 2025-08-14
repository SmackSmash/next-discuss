'use client';

import { Button } from '@heroui/button';
import { Avatar } from '@heroui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { signIn, signOut } from '@/actions';
import { useSession } from 'next-auth/react';

export default function HeaderAuth() {
  const session = useSession();

  return session.data ? (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <Avatar src={session.data?.user?.image || ''} />
      </PopoverTrigger>
      <PopoverContent>
        <form action={signOut}>
          <Button type='submit'>Sign Out</Button>
        </form>
      </PopoverContent>
    </Popover>
  ) : (
    <form action={signIn}>
      <Button type='submit'>Sign In With Google</Button>
    </form>
  );
}
