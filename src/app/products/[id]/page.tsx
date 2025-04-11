'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchProductById } from '../../../store/features/productsSlice';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/store/features/cartSlice';
import { formatPrice } from '@/app/cart/helpers';
import LoadingScreen from '@/components/LoadingScreen';
import { toast } from 'react-toastify';
import { Product } from '@/types/Product';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((state) => state.products);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = (product: Product) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    dispatch(addToCart(product));
    toast.success(`Product added to cart!`);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2500);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'failed' || product === null) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4'>
        <h2 className='text-2xl font-normal mb-4'>Product not found</h2>
        <Link href='/products' className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Image Section */}
          <div className='bg-white rounded-xl p-4 shadow-lg'>
            <div className='relative aspect-square'>
              <Image src={product.image} alt={product.title} fill sizes='(max-width: 768px) 100vw, 50vw' className='object-contain p-4' priority />
            </div>
          </div>

          {/* Details Section */}
          <div className='flex flex-col gap-6'>
            <div className='bg-gray-50 rounded-lg p-4'>
              <h1 className='text-3xl font-normal tracking-tight text-gray-900 mb-2'>{product.title}</h1>
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center'>
                  <span className='text-yellow-400 text-3xl'>★</span>
                  <span className='text-xl ml-1 font-medium text-gray-900'>{product.rating.rate}</span>
                </div>
                <span className='text-xl text-gray-600'>({product.rating.count} reviews)</span>
              </div>
              <p className='text-2xl font-medium text-blue-600'>{formatPrice(product.price)}</p>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 h-full'>
              <h2 className='text-lg font-medium text-gray-900 mb-2'>Description</h2>
              <p className='text-gray-600 leading-relaxed'>{product.description}</p>
            </div>

            <div className='flex flex-col md:flex-row gap-4 mt-auto'>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isButtonDisabled}
                className={`flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-auto disabled:pointer-events-none`}
              >
                Add to Cart
              </button>
              <Link
                href='/products'
                className='px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium text-center cursor-pointer'
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
