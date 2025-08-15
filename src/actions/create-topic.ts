'use server';

export async function createTopic(formData: FormData) {
  console.log(formData);

  const name = formData.get('name');
  const description = formData.get('description');
  //TODO: revalidate homepage
}
