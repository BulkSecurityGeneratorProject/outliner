import { IL3Row } from 'app/shared/model//l-3-row.model';
import { IL3 } from 'app/shared/model//l-3.model';

export interface IL3Table {
  id?: number;
  classification?: string;
  position?: string;
  flag?: string;
  rows?: IL3Row[];
  l3?: IL3;
}

export const defaultValue: Readonly<IL3Table> = {};
