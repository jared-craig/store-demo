'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/app/cart/helpers';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className='bg-white rounded-lg overflow-hidden flex flex-col h-full border-[3px] border-gray-300 hover:border-blue-500 transition-colors cursor-pointer'>
        <div className='relative h-48 w-full'>
          <Image src={product.image} alt={product.title} fill className='object-contain p-4' />
        </div>
        <div className='p-4 flex flex-col flex-grow'>
          <h2 className='text-lg font-normal mb-2 line-clamp-2 text-gray-900 tracking-tight'>{product.title}</h2>
          <p className='text-xl font-normal text-blue-600 mb-2 tracking-tight'>{formatPrice(product.price)}</p>
          <p className='text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed'>{product.description}</p>
          <div className='mt-auto flex items-center'>
            <span className='text-yellow-500'>★</span>
            <span className='ml-1 text-sm text-gray-600 font-normal tracking-tight'>
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
