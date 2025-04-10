'use client';

import { useState, useRef, useEffect } from 'react';

interface RatingFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
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

  const displayValue = value === null ? 'All Ratings' : `${value}+ Stars`;

  return (
    <div className='relative' ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent text-white min-w-[200px] text-left flex justify-between items-center'
      >
        <span>{displayValue}</span>
        <span className='ml-2'>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-1 w-full rounded-lg border border-gray-300 bg-black shadow-lg z-10'>
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
            className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 first:rounded-t-lg'
          >
            All Ratings
          </button>
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => {
                onChange(rating);
                setIsOpen(false);
              }}
              className='w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center gap-2'
            >
              <span className='text-yellow-500'>★</span>
              <span>{rating}+ Stars</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
