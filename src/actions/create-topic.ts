'use server';

import { z } from 'zod';
import { auth } from '@/auth';

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
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  const session = await auth();

  if (!session) return { errors: { _form: ['Not signed in'] } };

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors
    };
  }

  return {
    errors: {}
  };
  //TODO: revalidate homepage
}
