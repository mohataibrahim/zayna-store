import React, { createContext, useContext, useState, useEffect } from 'react';

export type Country = 'SA' | 'EG' | 'AE' | 'IQ';
export type Currency = 'SAR' | 'EGP' | 'AED' | 'IQD';

interface CountryInfo {
  code: Country;
  name: string;
  nameAr: string;
  currency: Currency;
  currencySymbol: string;
  currencySymbolAr: string;
}

const COUNTRIES: Record<Country, CountryInfo> = {
  SA: {
    code: 'SA',
    name: 'Saudi Arabia',
    nameAr: 'السعودية',
    currency: 'SAR',
    currencySymbol: 'SAR',
    currencySymbolAr: 'ر.س',
  },
  EG: {
    code: 'EG',
    name: 'Egypt',
    nameAr: 'مصر',
    currency: 'EGP',
    currencySymbol: 'EGP',
    currencySymbolAr: 'ج.م',
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    nameAr: 'الإمارات',
    currency: 'AED',
    currencySymbol: 'AED',
    currencySymbolAr: 'د.إ',
  },
  IQ: {
    code: 'IQ',
    name: 'Iraq',
    nameAr: 'العراق',
    currency: 'IQD',
    currencySymbol: 'IQD',
    currencySymbolAr: 'ع.د',
  },
};

// Conversion rates to SAR (base currency)
const CONVERSION_RATES: Record<Currency, number> = {
  SAR: 1,      // Base currency
  EGP: 0.074,  // 1 EGP ≈ 0.074 SAR
  AED: 0.73,   // 1 AED ≈ 0.73 SAR
  IQD: 0.0019, // 1 IQD ≈ 0.0019 SAR
};

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
  countryInfo: CountryInfo;
  currency: Currency;
  convertPrice: (priceInSAR: number) => string;
  getCurrencySymbol: (isArabic?: boolean) => string;
  getCountryName: (isArabic?: boolean) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<Country>(() => {
    const saved = localStorage.getItem('selectedCountry');
    return (saved as Country) || 'SA';
  });

  useEffect(() => {
    localStorage.setItem('selectedCountry', country);
  }, [country]);

  const countryInfo = COUNTRIES[country];
  const currency = countryInfo.currency;

  const convertPrice = (priceInSAR: number): string => {
    const rate = CONVERSION_RATES[currency];
    const converted = priceInSAR / rate;
    return converted.toFixed(2);
  };

  const getCurrencySymbol = (isArabic = false): string => {
    return isArabic ? countryInfo.currencySymbolAr : countryInfo.currencySymbol;
  };

  const getCountryName = (isArabic = false): string => {
    return isArabic ? countryInfo.nameAr : countryInfo.name;
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry: setCountryState,
        countryInfo,
        currency,
        convertPrice,
        getCurrencySymbol,
        getCountryName,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return context;
}

export function getCountries() {
  return Object.values(COUNTRIES);
}
