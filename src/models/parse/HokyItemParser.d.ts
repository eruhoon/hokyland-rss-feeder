import { HokyItem } from '../common/HokyItem';

export interface HokyItemParser {
  public parse(body: string): HokyItem[];
}
