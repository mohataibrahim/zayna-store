import { Country } from '@/contexts/CountryContext';

export interface Product {
  id: string;
  productId: string;
  name: string;
  price: string;
  description: string;
  image: string;
  video?: string;
  country: Country;
  createdAt?: string;
}

export type Currency = 'SAR' | 'EGP' | 'AED' | 'IQD';
