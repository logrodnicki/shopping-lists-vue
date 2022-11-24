import { Units } from '@/types/units';

export interface NewProduct {
  id: string;
  name: string;
  amount: number;
  unit: Units;
  completed: boolean;
}
