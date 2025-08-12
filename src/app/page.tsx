import { prisma } from '@/db';

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  return <div>Home Page</div>;
}
