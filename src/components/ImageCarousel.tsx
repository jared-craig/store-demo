'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

interface CarouselSettings {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  arrows?: boolean;
  responsive?: {
    breakpoint: number;
    settings: {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      arrows?: boolean;
    };
  }[];
}

interface ImageCarouselProps {
  images: CarouselImage[];
  settings?: CarouselSettings;
}

export default function ImageCarousel({ images, settings }: ImageCarouselProps) {
  return (
    <div className='w-full max-w-6xl mx-auto my-8'>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className='relative h-[400px] w-full'>
            <Image src={image.src} alt={image.alt} fill sizes={`${100.0 / (settings?.slidesToShow ?? 1)}vw`} className='object-contain' priority />
            {image.description && <div className='absolute bottom-0 left-0 w-full p-4 text-center text-white bg-black/40'>{image.description}</div>}
          </div>
        ))}
      </Slider>
    </div>
  );
}
