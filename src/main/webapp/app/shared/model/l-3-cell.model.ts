import { IL3Row } from 'app/shared/model//l-3-row.model';

export interface IL3Cell {
  id?: number;
  classification?: string;
  position?: string;
  value?: string;
  row?: IL3Row;
}

export const defaultValue: Readonly<IL3Cell> = {};
