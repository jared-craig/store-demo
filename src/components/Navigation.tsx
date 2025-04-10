'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export function Navigation() {
  const cart = useAppSelector((state) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className='relative top-0 z-50 bg-gray-950 h-16 shadow-md shadow-gray-950'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='text-2xl hover:font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400'>
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

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='absolute top-full left-0 right-0 md:hidden z-1000 p-4 space-y-4 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg backdrop-blur-sm'>
            <Link
              href='/'
              className='block text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-gray-700/50'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href='/products'
              className='block text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-gray-700/50'
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href='/cart'
              className='block text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-gray-700/50'
              onClick={() => setIsMenuOpen(false)}
            >
              Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
