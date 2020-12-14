import { Column } from './column';
import { Row } from './row';

export interface Table {
  columns: Column[];
  data: Row[];
}
