import { IL3 } from 'app/shared/model//l-3.model';
import { IL1 } from 'app/shared/model//l-1.model';

export interface IL2 {
  id?: number;
  classification?: string;
  title?: string;
  position?: string;
  content?: any;
  l3S?: IL3[];
  l1?: IL1;
}

export const defaultValue: Readonly<IL2> = {};
