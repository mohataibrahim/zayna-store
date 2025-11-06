import { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountry, getCountries } from '@/contexts/CountryContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Search, Moon, Sun } from 'lucide-react';

export default function Header() {
  const [, navigate] = useLocation();
  const { language, setLanguage, isRTL } = useLanguage();
  const { country, setCountry } = useCountry();
  const { theme, toggleTheme } = useTheme();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin code
    if (searchInput.toLowerCase() === 'adminzayna') {
      navigate('/admin');
      setSearchInput('');
      return;
    }
    
    // Regular search functionality can be added here
    setSearchInput('');
  };

  const countries = getCountries();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.jpg"
              alt="ZAYNA"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-accent">ZAYNA</span>
              <span className="text-xs text-foreground/60">
                {language === 'ar' ? 'متجر فاخر' : 'Luxury Store'}
              </span>
            </div>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث' : 'Search'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-accent/80 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Country Selector */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as any)}
              className="px-3 py-2 bg-background text-foreground border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>
                  {language === 'ar' ? c.nameAr : c.name}
                </option>
              ))}
            </select>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
              title={language === 'ar' ? 'تبديل الوضع' : 'Toggle theme'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Language Toggle */}
            <Button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              variant="outline"
              size="sm"
              className="text-accent border-accent hover:bg-accent hover:text-accent-foreground"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
