type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
