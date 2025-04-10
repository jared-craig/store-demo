'use client';

import { useState, useRef, useEffect } from 'react';
import { CATEGORY_DISPLAY_NAMES, Category } from '@/types/categories';

interface CategorySelectProps {
  value: Category | null;
  onChange: (value: Category | null) => void;
  categories: Category[];
}

export function CategorySelect({ value, onChange, categories }: CategorySelectProps) {
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

  return (
    <div className='relative' ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent text-white min-w-[200px] text-left flex justify-between items-center'
      >
        <span>{value ? CATEGORY_DISPLAY_NAMES[value] : 'All Categories'}</span>
        <span className='ml-2'>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-1 w-full rounded-lg border border-gray-300 bg-black shadow-lg z-10'>
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg'
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onChange(category);
                setIsOpen(false);
              }}
              className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 first:rounded-t-lg last:rounded-b-lg'
            >
              {CATEGORY_DISPLAY_NAMES[category]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
