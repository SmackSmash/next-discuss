import { appSignIn } from '@/actions';

export default async function Home() {
  return (
    <div>
      <form action={appSignIn}>
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
}
