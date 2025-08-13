import { Button } from '@heroui/button';
import { signIn, signOut } from '@/actions';

export default function Home() {
  return (
    <div>
      <form action={signIn}>
        <Button type='submit'>Sign In</Button>
      </form>
      <form action={signOut}>
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  );
}
