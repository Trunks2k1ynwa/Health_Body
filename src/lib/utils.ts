import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const caculateProtein = (weight: number) => {
  return 2.6 * weight;
};
export const caculateFat = (caloIn: number, proteinIn: number) => {
  return +((caloIn - proteinIn * 4) / 15).toFixed(2);
};
export const caculateCarb = (fatIn: number) => {
  return +(1.5 * fatIn).toFixed(2);
};
