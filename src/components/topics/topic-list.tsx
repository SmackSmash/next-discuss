import { Chip } from '@heroui/chip';
import { prisma } from '@/db';

export default async function TopicList() {
  const topics = await prisma.topic.findMany();

  return (
    <div>
      {topics.map(({ id, slug }) => (
        <Chip key={id}>{slug}</Chip>
      ))}
    </div>
  );
}
