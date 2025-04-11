'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAllProducts } from '../../store/features/productsSlice';
import { ProductCard } from '@/components/ProductCard';
import { CategorySelect } from '@/components/CategorySelect';
import { SortSelect, SortOption } from '@/components/SortSelect';
import { RatingFilter } from '@/components/RatingFilter';
import { BackToTop } from '@/components/BackToTop';
import { CATEGORY_DISPLAY_NAMES, Category } from '@/types/Category';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products: items, status, error } = useAppSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('popularity-desc');
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className='p-4'>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className='p-4 text-red-500'>Error: {error}</div>;
  }

  // Group products by category
  const productsByCategory = items.reduce((acc, product) => {
    const category = product.category as Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<Category, typeof items>);

  // Get unique categories
  const categories = Object.keys(productsByCategory) as Category[];

  // Sort products based on the selected option
  const sortProducts = (products: typeof items) => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-asc':
          return a.rating.rate - b.rating.rate;
        case 'rating-desc':
          return b.rating.rate - a.rating.rate;
        case 'popularity-asc':
          return a.rating.count - b.rating.count;
        case 'popularity-desc':
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });
  };

  // Filter products by rating
  const filterByRating = (products: typeof items) => {
    if (minRating === null) return products;
    return products.filter((product) => product.rating.rate >= minRating);
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col lg:flex-row space-y-2 lg:space-y-0 justify-between items-center mb-6'>
        <h1 className='text-2xl font-normal tracking-tight'>Products</h1>
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
          <CategorySelect value={selectedCategory} onChange={setSelectedCategory} categories={categories} />
          <RatingFilter value={minRating} onChange={setMinRating} />
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {/* Products Grid */}
      {(() => {
        const filteredCategories = Object.entries(productsByCategory)
          .filter(([category]) => selectedCategory === null || category === selectedCategory)
          .map(([category, products]) => {
            const filteredProducts = sortProducts(filterByRating(products));
            if (filteredProducts.length === 0) return null;

            return (
              <div key={category} className='mb-6'>
                <h2 className='text-xl font-normal mb-4 text-white tracking-tight'>{CATEGORY_DISPLAY_NAMES[category as Category]}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })
          .filter(Boolean);

        if (filteredCategories.length === 0) {
          return (
            <div className='text-center py-12'>
              <h2 className='text-xl font-normal mb-2 tracking-tight'>No products found</h2>
              <p className='text-gray-400 leading-relaxed'>Try adjusting your filters to see more products</p>
            </div>
          );
        }

        return filteredCategories;
      })()}
      <BackToTop />
    </div>
  );
}
