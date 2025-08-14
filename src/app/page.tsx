import Image from 'next/image';
import { Button } from '@heroui/button';
import { signIn, signOut } from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';

export default async function Home() {
  const session = await auth();

  return (
    <div className='flex items-center gap-2 p-2'>
      {session ? (
        <>
          <form action={signOut}>
            <Button type='submit'>Sign Out</Button>
          </form>
          <Image
            src={session.user?.image!}
            alt={session.user?.name!}
            width='40'
            height='40'
            className='rounded-full'
          />
        </>
      ) : (
        <form action={signIn}>
          <Button type='submit'>Sign In</Button>
        </form>
      )}
      <Profile />
    </div>
  );
}
