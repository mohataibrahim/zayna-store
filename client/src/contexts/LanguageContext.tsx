import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ar: {
    'home': 'الرئيسية',
    'products': 'المنتجات',
    'search': 'بحث',
    'admin': 'الإدارة',
    'language': 'اللغة',
    'view_details': 'عرض التفاصيل',
    'add_to_cart': 'إضافة إلى السلة',
    'buy_whatsapp': 'شراء عبر واتساب',
    'quantity': 'الكمية',
    'price': 'السعر',
    'description': 'الوصف',
    'product_name': 'اسم المنتج',
    'add_product': 'إضافة منتج',
    'product_image': 'صورة المنتج',
    'product_video': 'فيديو المنتج (اختياري)',
    'video_url': 'رابط الفيديو',
    'admin_panel': 'لوحة التحكم',
    'currency': 'العملة',
    'sar': 'ريال سعودي',
    'egp': 'جنيه مصري',
    'aed': 'درهم إماراتي',
    'zayna': 'زينة',
    'luxury_store': 'متجر فاخر',
    'loading': 'جاري التحميل...',
  },
  en: {
    'home': 'Home',
    'products': 'Products',
    'search': 'Search',
    'admin': 'Admin',
    'language': 'Language',
    'view_details': 'View Details',
    'add_to_cart': 'Add to Cart',
    'buy_whatsapp': 'Buy via WhatsApp',
    'quantity': 'Quantity',
    'price': 'Price',
    'description': 'Description',
    'product_name': 'Product Name',
    'add_product': 'Add Product',
    'product_image': 'Product Image',
    'product_video': 'Product Video (Optional)',
    'video_url': 'Video URL',
    'admin_panel': 'Admin Panel',
    'currency': 'Currency',
    'sar': 'Saudi Riyal',
    'egp': 'Egyptian Pound',
    'aed': 'UAE Dirham',
    'zayna': 'ZAYNA',
    'luxury_store': 'Luxury Store',
    'loading': 'Loading...',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
