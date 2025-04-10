export const formatPrice = (price: number): string => {
  // Convert to cents, round, then back to dollars to avoid floating point issues
  const roundedPrice = Math.round(price * 100) / 100;

  // Use Intl.NumberFormat for locale-aware formatting
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedPrice);
};
