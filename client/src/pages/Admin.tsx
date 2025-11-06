import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { getProducts, addProduct, deleteProduct, saveProducts } from '@/lib/utils';
import { Product } from '@/lib/types';
import { Trash2, Plus } from 'lucide-react';

export default function Admin() {
  const [, navigate] = useLocation();
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    video: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setFormData(prev => ({ ...prev, image: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      alert(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    const newProduct = addProduct({
      name: formData.name,
      price: formData.price,
      description: formData.description,
      image: formData.image,
      video: formData.video || undefined,
    });

    setProducts(prev => [...prev, newProduct]);
    setFormData({ name: '', price: '', description: '', image: '', video: '' });
    setImagePreview('');
    
    alert(language === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm(language === 'ar' ? 'هل تريد حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container py-12">
        <h1 className="text-4xl font-bold text-accent mb-8">{t('admin_panel')}</h1>

        {/* Add Product Form */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-accent mb-6">{t('add_product')}</h2>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  {t('product_name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={language === 'ar' ? 'اسم المنتج' : 'Product name'}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  {t('price')} (SAR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="350"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                {t('description')} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={language === 'ar' ? 'وصف المنتج' : 'Product description'}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                {t('product_image')} *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                {t('product_video')}
              </label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://example.com/video.mp4"
              />
            </div>

            <Button
              type="submit"
              className="btn-gold-invert py-3 text-lg font-semibold w-full"
            >
              <Plus size={20} className="mr-2" />
              {t('add_product')}
            </Button>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-accent mb-6">
            {language === 'ar' ? 'المنتجات الحالية' : 'Current Products'}
          </h2>
          
          {products.length === 0 ? (
            <p className="text-foreground/60 text-center py-8">
              {language === 'ar' ? 'لا توجد منتجات حالياً' : 'No products yet'}
            </p>
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{product.name}</h3>
                      <p className="text-sm text-foreground/60">{product.price} SAR</p>
                      <p className="text-sm text-foreground/60 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
