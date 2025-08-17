import Link from 'next/link';
import { Chip } from '@heroui/chip';
import { prisma } from '@/db';

export default async function TopicList() {
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      slug: true
    }
  });

  return (
    <div>
      {topics.map(({ id, slug }) => (
        <Link href={slug} key={id}>
          <Chip>{slug}</Chip>
        </Link>
      ))}
    </div>
  );
}
