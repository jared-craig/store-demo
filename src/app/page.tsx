'use client';

import ImageCarousel from '@/components/ImageCarousel';
import { fetchAllProducts } from '@/store/features/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const carouselImages = products.map((product) => ({
    id: product.id,
    src: product.image,
    alt: product.title,
    description: product.title,
  }));

  return (
    <div className='flex flex-col items-center justify-center min-h-full p-4'>
      <h1 className='text-2xl md:text-4xl font-normal mb-4 tracking-tight text-center'>
        Welcome to Store Demo
      </h1>
      <p className='text-gray-400 text-lg leading-relaxed text-center max-w-2xl'>
        This is a demo of a store leveraging Next.js, Tailwind CSS, Redux
        Toolkit, and TypeScript. All data is fetched from the{' '}
        <a href='https://fakestoreapi.com/' className='text-blue-500'>
          Fake Store API
        </a>
        .
      </p>
      {status === 'succeeded' && (
        <ImageCarousel
          images={carouselImages}
          settings={{
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  dots: false,
                  infinite: true,
                  speed: 250,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 3000,
                  arrows: false,
                },
              },
            ],
          }}
        />
      )}
    </div>
  );
}
