import { IL3Table } from 'app/shared/model//l-3-table.model';
import { IL2 } from 'app/shared/model//l-2.model';

export interface IL3 {
  id?: number;
  classification?: string;
  title?: string;
  position?: string;
  content?: any;
  tables?: IL3Table[];
  l2?: IL2;
}

export const defaultValue: Readonly<IL3> = {};
