'use client';

import { clearCart, removeFromCart, updateQuantity } from '@/store/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { formatPrice } from './helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      setItemToDelete(null);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-normal tracking-tight'>Cart</h1>
      <div>
        {cart.length > 0 ? (
          cart.map((product) => (
            <div key={product.id} className='flex flex-wrap justify-between items-center p-4 border-b border-gray-300'>
              <div className='flex flex-shrink-0 gap-4 items-center'>
                <Link href={`/products/${product.id}`}>
                  <Image src={product.image} alt={product.title} width={50} height={50} className='rounded-lg object-contain' />
                </Link>
                <Link href={`/products/${product.id}`} className='text-lg font-medium'>
                  <span className='truncate line-clamp-1 overflow-hidden max-w-[50vw] block'>{product.title}</span>
                </Link>
              </div>
              <div className='flex gap-6 items-center w-full lg:w-auto justify-end lg:justify-start'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: product.id, increment: false }))}
                    disabled={product.quantity <= 1}
                    className='p-1 rounded-full hover:text-red-500 cursor-pointer disabled:opacity-50 disabled:text-inherit disabled:cursor-auto'
                  >
                    <MinusIcon className='w-5 h-5' />
                  </button>
                  <span className='text-center font-medium'>{product.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: product.id, increment: true }))}
                    className='p-1 rounded-full hover:text-green-500 cursor-pointer'
                  >
                    <PlusIcon className='w-5 h-5' />
                  </button>
                </div>
                <p className='float-right'>{formatPrice(product.price * product.quantity)}</p>
                <button onClick={() => handleDelete(product.id)} className='text-gray-400 hover:text-red-500 transition-colors cursor-pointer'>
                  <TrashIcon className='w-6 h-6' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center h-full'>
            <h2>No items in cart</h2>
          </div>
        )}
        <div className='flex justify-end p-4'>
          <h3 className='text-xl font-normal tracking-tight'>
            Subtotal: {formatPrice(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))}
          </h3>
        </div>
      </div>
      <div className='flex justify-end gap-4 mt-2'>
        <button
          onClick={() => dispatch(clearCart())}
          disabled={cart.length === 0}
          className='float-right px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-auto disabled:pointer-events-none'
        >
          Clear Cart
        </button>
        <button
          disabled={cart.length === 0}
          className='float-right px-6 py-3 border border-gray-300 rounded-lg hover:bg-green-700 transition-colors font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-auto disabled:pointer-events-none'
        >
          Checkout
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={itemToDelete !== null}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title='Remove Item'
        description='Are you sure you want to remove this item from your cart?'
        confirmButtonText='Remove'
      />
    </div>
  );
}
