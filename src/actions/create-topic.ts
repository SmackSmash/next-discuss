'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/db';
import paths from '@/paths';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { message: 'Must be lowercase letters or dashes without spaces' }),
  description: z.string().min(10)
});

// This state type is important not just in this function, but in any components
// that call this function in useActionState
type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    // Underscore just to futureproof and avoid any potantial name clash
    _form?: string[];
  };
};

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  let topicSlug: string;
  try {
    // Check user is authorized to perform this action
    const session = await auth();
    if (!session) return { errors: { _form: ['Not signed in'] } };

    // Validate form
    const result = createTopicSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description')
    });

    if (!result.success) {
      return {
        errors: z.flattenError(result.error).fieldErrors
      };
    }

    // Insert data to db
    const topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    });

    topicSlug = topic.slug;
  } catch (error) {
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

  revalidatePath(paths.home());
  redirect(paths.topicShow(topicSlug));
}
