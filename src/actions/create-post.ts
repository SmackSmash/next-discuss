'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/db';
import paths from '@/paths';

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
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { errors: { _form: ['Not signed in'] } };

    const result = createPostSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content')
    });

    if (!result.success) {
      return {
        errors: z.flattenError(result.error).fieldErrors
      };
    }

    const topic = await prisma.topic.findUnique({ where: { slug }, select: { id: true } });

    if (!topic) {
      return {
        errors: {
          _form: ['Invalid topic']
        }
      };
    }

    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    });

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      };
    }

    return {
      errors: {
        _form: ['Something went wrong']
      }
    };
  }
}
