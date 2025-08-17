import Link from 'next/link';
import { Chip } from '@heroui/chip';
import { prisma } from '@/db';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      slug: true
    }
  });

  return (
    <div className='flex flex-wrap gap-2'>
      {topics.map(({ id, slug }) => (
        <Link href={paths.topicShow(slug)} key={id}>
          <Chip color='warning'>{slug}</Chip>
        </Link>
      ))}
    </div>
  );
}
