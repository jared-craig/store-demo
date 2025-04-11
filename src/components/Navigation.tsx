'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { ShoppingCartIcon, Squares2X2Icon, HomeIcon } from '@heroicons/react/24/solid';

export function Navigation() {
  const cart = useAppSelector((state) => state.cart.items);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className='relative top-0 z-50 bg-gray-950 h-16 shadow-md shadow-gray-950'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            className='text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600'
          >
            Store Demo
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-6'>
            <Link href='/' className='text-gray-300 hover:text-white transition-colors relative group'>
              Home
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/products' className='text-gray-300 hover:text-white transition-colors relative group'>
              Products
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/cart' className='text-gray-300 hover:text-white transition-colors relative group'>
              Cart ({cartCount})<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className='md:hidden flex gap-5'>
            <Link href='/'>
              <HomeIcon className='w-6 h-6' />
            </Link>
            <Link href='/products'>
              <Squares2X2Icon className='w-6 h-6' />
            </Link>
            <Link href='/cart'>
              <div className='flex gap-1 items-center'>
                <ShoppingCartIcon className='w-6 h-6' /> ({cartCount})
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
