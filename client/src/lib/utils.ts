import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Currency } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency conversion rates (approximate, should be updated regularly)
const CONVERSION_RATES: Record<Currency, number> = {
  SAR: 1,      // Base currency
  EGP: 13.5,   // 1 SAR ≈ 13.5 EGP
  AED: 1.37,   // 1 SAR ≈ 1.37 AED
  IQD: 525,    // 1 SAR ≈ 525 IQD
};

export function convertPrice(priceInSAR: number, toCurrency: Currency): string {
  const rate = CONVERSION_RATES[toCurrency];
  const converted = priceInSAR * rate;
  
  if (toCurrency === 'IQD') {
    return Math.round(converted).toString();
  }
  
  return converted.toFixed(2);
}
