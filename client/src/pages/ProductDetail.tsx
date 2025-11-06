import { useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountry } from '@/contexts/CountryContext';
import Header from '@/components/Header';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const { currency, convertPrice, getCurrencySymbol, getCountryName } = useCountry();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products = getProducts();
    const found = products.find((p: Product) => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  if (!product) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">{t('loading')}</div>;
  }

  const convertedPrice = convertPrice(parseFloat(product.price));
  const currencySymbol = getCurrencySymbol(true);

  const handleWhatsAppPurchase = () => {
    const message = `مرحبًا، أود شراء هذا المنتج من متجر ZAYNA:\n\n📦 الاسم: ${product.name}\n💰 السعر: ${convertedPrice} ${currencySymbol}\n🔢 الكمية: ${quantity}\n🖼️ صورة المنتج: ${window.location.origin}${product.image}\n📝 الوصف: ${product.description}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212721199652?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container py-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-accent hover:text-accent/80 transition-colors"
        >
          ← {t('language') === 'ar' ? 'العودة' : 'Back'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg image-hover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-accent mb-2">{product.name}</h1>
              <p className="text-2xl text-accent">
                {convertedPrice} {currencySymbol}
              </p>
              <p className="text-sm text-foreground/60 mt-2">
                {getCountryName(true)}
              </p>
            </div>

            <p className="text-lg text-foreground/80">{product.description}</p>

            {/* Video Player */}
            {product.video && (
              <div className="rounded-lg overflow-hidden bg-card">
                <video
                  controls
                  className="w-full h-auto max-h-[300px]"
                  src={product.video}
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-foreground font-semibold">{t('quantity')}:</label>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-accent hover:bg-card transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-accent hover:bg-card transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Purchase Button */}
            <Button
              onClick={handleWhatsAppPurchase}
              className="btn-gold-invert py-6 text-lg font-semibold"
            >
              {t('buy_whatsapp')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
