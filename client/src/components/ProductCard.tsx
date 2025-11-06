import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCountry } from '@/contexts/CountryContext';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { convertPrice, getCurrencySymbol } = useCountry();

  const convertedPrice = convertPrice(parseFloat(product.price));
  const currencySymbol = getCurrencySymbol(true);

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
        </div>

        {/* View Details Button */}
        <Button
          onClick={onClick}
          className="btn-gold-invert w-full py-3 font-semibold flex items-center justify-center gap-2"
        >
          عرض التفاصيل
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
