import Link from 'next/link';
import { useEffect, useState } from 'react';

import { EnterAppButton, ReadTheDocsButton } from '@/components/Button';
// import ReadTheDocsLink from '@/components/Link';

const SCROLL_BREAK_POINT = 200;

function RealmsLogo() {
  return (
    <Link href='/'>
      <div className='flex cursor-pointer items-center space-x-1 hover:brightness-110'>
        <img
          src='/icons/realms-logo.svg'
          className='h-8 w-8'
          alt='Realms Logo'
        />
        <span>Realms</span>
      </div>
    </Link>
  );
}

type NavBarProps = {
  children: React.ReactNode;
};

export const NavContent = ({ children }: NavBarProps) => {
  return (
    <div className='mx-auto flex max-w-[1440px] items-center justify-between px-5'>
      <RealmsLogo />
      {children}
    </div>
  );
};

export default function NavBar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-10 w-full py-5 transition-all duration-300  ${
        scrollY > SCROLL_BREAK_POINT
          ? 'bg-background bg-opacity-90 backdrop-blur-[3px]'
          : ''
      }`}
    >
      <div className={`${scrollY < SCROLL_BREAK_POINT ? 'hidden' : ''}`}>
        <NavContent>
          <EnterAppButton />
        </NavContent>
      </div>
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 ${
          scrollY < SCROLL_BREAK_POINT ? '' : 'hidden'
        }`}
      >
        <RealmsLogo />
        <div>
          <ReadTheDocsButton />
        </div>
      </div>
    </div>
  );
}
