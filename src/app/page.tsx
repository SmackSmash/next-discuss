import { prisma } from '@/db';

export default async function Home() {
  const users = await prisma.user.findMany();

  return <div>Home Page</div>;
}
