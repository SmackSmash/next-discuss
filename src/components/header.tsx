'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar
} from '@heroui/react';
import { signIn, signOut } from '@/actions';

export default function Header() {
  const session = useSession();

  console.log(session);

  return (
    <Navbar className='mb-6 shadow'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {session.data ? (
          <>
            <form action={signOut}>
              <Button type='submit'>Sign Out</Button>
            </form>
            <Avatar src={session.data?.user?.image!} />
          </>
        ) : (
          <form action={signIn}>
            <Button type='submit'>Sign In</Button>
          </form>
        )}
      </NavbarContent>
    </Navbar>
  );
}
