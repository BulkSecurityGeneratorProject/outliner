import { Moment } from 'moment';
import { IL3Cell } from 'app/shared/model//l-3-cell.model';
import { IL3Table } from 'app/shared/model//l-3-table.model';

export interface IL3Row {
  id?: number;
  classification?: string;
  title?: string;
  datetime?: Moment;
  position?: string;
  cells?: IL3Cell[];
  table?: IL3Table;
}

export const defaultValue: Readonly<IL3Row> = {};
