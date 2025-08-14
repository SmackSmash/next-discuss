import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { auth } from '@/auth';
import { signIn, signOut } from '@/actions';

export default async function Header() {
  const session = await auth();

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
        {session ? (
          <>
            <Popover placement='bottom'>
              <PopoverTrigger>
                <Avatar src={session.user?.image || ''} />
              </PopoverTrigger>
              <PopoverContent>
                <form action={signOut}>
                  <Button type='submit'>Sign Out</Button>
                </form>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <form action={signIn}>
            <Button type='submit'>Sign In With Google</Button>
          </form>
        )}
      </NavbarContent>
    </Navbar>
  );
}
