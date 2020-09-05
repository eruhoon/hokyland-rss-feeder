import { HokyItem } from './HokyItem';

export interface HokyItemParser {
  public parse(body: string): HokyItem[];
}
