import { signIn } from '@/actions';

export default async function Home() {
  return (
    <div>
      <form action={signIn}>
        <button>Sign In</button>
      </form>
    </div>
  );
}
