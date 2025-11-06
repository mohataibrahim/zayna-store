import { useParams, useLocation } from 'wouter';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountry } from '@/contexts/CountryContext';
import Header from '@/components/Header';
import { trpc } from '@/lib/trpc';
import { Copy } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const { currency, convertPrice, getCurrencySymbol, getCountryName } = useCountry();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Fetch product from API
  const productId = parseInt(id || '0', 10);
  const { data: product, isLoading } = trpc.products.get.useQuery({ id: productId });

  if (isLoading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">{t('loading')}</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Product not found</div>;
  }

  const convertedPrice = convertPrice(parseFloat(product.price));
  const currencySymbol = getCurrencySymbol(true);

  const handleWhatsAppPurchase = () => {
    const message = `السلام عليكم\n${product.productId}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212721199652?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyProductId = () => {
    navigator.clipboard.writeText(product.productId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

            {/* Product ID */}
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-foreground/60 mb-2">
                {t('language') === 'ar' ? 'معرف المنتج' : 'Product ID'}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl font-bold text-accent">{product.productId}</span>
                <Button
                  onClick={handleCopyProductId}
                  variant="outline"
                  size="sm"
                  className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Copy size={16} />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-500 mt-2">
                  {t('language') === 'ar' ? 'تم النسخ!' : 'Copied!'}
                </p>
              )}
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
