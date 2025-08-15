'use client';

import { Button, Avatar, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from '@/actions';

export default function HeaderAuth() {
  const session = useSession();

  if (session.status === 'loading') return 'Loading...';

  return session.data?.user ? (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <Avatar src={session.data.user.image || ''} />
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
