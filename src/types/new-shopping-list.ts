import { Units } from '@/types/units';

export interface ProductForm {
  id: string | number;
  name: string;
  amount: number;
  unit: Units;
  completed: boolean;
  isNew?: boolean;
}
