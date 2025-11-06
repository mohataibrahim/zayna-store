import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/utils';
import { Product } from '@/lib/types';

export default function Home() {
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <img
            src="/logo.jpg"
            alt="ZAYNA"
            className="w-32 h-32 mx-auto mb-6 rounded-lg animate-glow"
          />
          <h1 className="text-5xl font-bold text-accent mb-2">ZAYNA</h1>
          <p className="text-xl text-foreground/60">{t('luxury_store')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container py-12">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-accent mb-4">ZAYNA | {t('zayna')}</h1>
          <p className="text-xl text-foreground/60">{t('luxury_store')}</p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-foreground/60 mb-6">
              {t('language') === 'ar' ? 'لا توجد منتجات حالياً' : 'No products available yet'}
            </p>
            <p className="text-sm text-foreground/40">
              {t('language') === 'ar' 
                ? 'استخدم رمز الإدارة للوصول إلى لوحة التحكم' 
                : 'Use the admin code to access the control panel'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
