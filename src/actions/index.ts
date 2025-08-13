'use server';

import { signIn, signOut } from '@/auth';

export async function appSignIn() {
  return signIn('google');
}

export async function appSignOut() {
  return signOut();
}
