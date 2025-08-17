'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { type Topic } from '@prisma/client';
import { prisma } from '@/db';
import paths from '@/paths';
import { redirect } from 'next/navigation';

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
  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    });
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

  redirect(paths.topicShow(topic.slug));
  //TODO: revalidate homepage
}
