'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { type Post } from '@prisma/client';
import { prisma } from '@/db';
import paths from '@/paths';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  if (!session) return { errors: { _form: ['Not signed in'] } };

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors
    };
  }

  return {
    errors: {}
  };

  // let post: Post;
  // try {
  //   post = await prisma.post.create({
  //     data: {
  //       title: result.data.title,
  //       content: result.data.content
  //     }
  //   });
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return {
  //       errors: {
  //         _form: [error.message]
  //       }
  //     };
  //   }

  //   return {
  //     errors: {
  //       _form: ['Something went wrong']
  //     }
  //   };
  // }

  //TODO: revalidate topicPage
}
