type PostShowProps = {};

export default function PostShow({}: PostShowProps) {
  return (
    <div className='m-4'>
      <h1 className='my-2 text-2xl font-bold'>{post.title}</h1>
      <p className='rounded border p-4'>{post.content}</p>
    </div>
  );
}
