'use client';

import { Button } from '@heroui/react';
import { signIn } from '@/actions';

export default function Home() {
  return (
    <div>
      <form action={signIn}>
        <Button type='submit'>Sign In</Button>
      </form>
    </div>
  );
}
