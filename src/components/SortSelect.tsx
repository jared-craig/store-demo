'use client';

import { useState, useRef, useEffect } from 'react';

export type SortOption = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'popularity-asc' | 'popularity-desc';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = {
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'rating-asc': 'Rating: Low to High',
    'rating-desc': 'Rating: High to Low',
    'popularity-asc': 'Popularity: Low to High',
    'popularity-desc': 'Popularity: High to Low',
  }[value];

  return (
    <div className='relative' ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full min-w-[200px] text-left justify-between items-center px-4 py-2 bg-transparent text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      >
        <span>{displayValue}</span>
        <span className='ml-2'>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-1 w-full rounded-lg border border-gray-300 bg-black shadow-lg z-10'>
          <button
            onClick={() => {
              onChange('price-asc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 first:rounded-t-lg'
          >
            Price: Low to High
          </button>
          <button
            onClick={() => {
              onChange('price-desc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800'
          >
            Price: High to Low
          </button>
          <button
            onClick={() => {
              onChange('rating-asc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800'
          >
            Rating: Low to High
          </button>
          <button
            onClick={() => {
              onChange('rating-desc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800'
          >
            Rating: High to Low
          </button>
          <button
            onClick={() => {
              onChange('popularity-asc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800'
          >
            Popularity: Low to High
          </button>
          <button
            onClick={() => {
              onChange('popularity-desc');
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 last:rounded-b-lg'
          >
            Popularity: High to Low
          </button>
        </div>
      )}
    </div>
  );
}
