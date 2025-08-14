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
          <div>{session.user?.email}</div>
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
