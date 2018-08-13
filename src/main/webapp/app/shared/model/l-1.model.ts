import { IL2 } from 'app/shared/model//l-2.model';

export interface IL1 {
  id?: number;
  classification?: string;
  title?: string;
  position?: string;
  l2S?: IL2[];
}

export const defaultValue: Readonly<IL1> = {};
