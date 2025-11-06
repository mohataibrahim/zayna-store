import { Product, Currency } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { convertPrice, getCurrencySymbol } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('currency') as Currency) || 'SAR';
  });

  const convertedPrice = convertPrice(parseFloat(product.price), currency);
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="product-card bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover image-hover"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-accent line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/70 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent">
            {convertedPrice} {currencySymbol}
          </span>
          <select
            value={currency}
            onChange={(e) => {
              const newCurrency = e.target.value as Currency;
              setCurrency(newCurrency);
              localStorage.setItem('currency', newCurrency);
            }}
            className="text-xs bg-background text-foreground border border-border rounded px-2 py-1"
          >
            <option value="SAR">SAR</option>
            <option value="EGP">EGP</option>
            <option value="AED">AED</option>
          </select>
        </div>

        {/* View Details Button */}
        <Button
          onClick={onClick}
          className="btn-gold-invert w-full py-3 font-semibold flex items-center justify-center gap-2"
        >
          {t('view_details')}
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
