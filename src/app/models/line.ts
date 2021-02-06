import { Point } from './point';

export interface Line {
  a: Point;
  b: Point;
  highlight: boolean;
  length: number;
}
