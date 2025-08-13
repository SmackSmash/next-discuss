'use server';

import * as auth from '@/auth';

export async function signIn() {
  return auth.singIn('google');
}

export async function signOut() {
  return auth.signOut();
}
