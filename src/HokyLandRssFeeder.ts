import { HokyItemParserImpl } from './HokyItemParserImpl';
import { SimpleHttpFetcher } from './SimpleUrlFetcher';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const url =
      'http://hoky.co.kr/template/1/categ_list.asp?categ_code=97&page=1&cv=6&orderOPT=0&pagesize=100';

    const contents = await new SimpleHttpFetcher().fetch(url);
    const items = new HokyItemParserImpl().parse(contents);
    console.log(items);
  }
}
