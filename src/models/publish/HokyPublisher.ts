import { Feed } from 'feed';
import { HttpFetcher } from '../fetch/HttpFetcher';
import { HokyItemParser } from '../parse/HokyItemParser';
import { HokyFeedMaker } from '../feed/HokyFeedMaker';
import { SimpleHttpFetcher } from '../fetch/SimpleUrlFetcher';
import { HokyItemParserImpl } from '../parse/HokyItemParserImpl';

export class HokyPublisher {
  private mFetcher: HttpFetcher;
  private mParser: HokyItemParser;
  private mFeedMaker: HokyFeedMaker;

  public constructor() {
    this.mFetcher = new SimpleHttpFetcher();
    this.mParser = new HokyItemParserImpl();
    this.mFeedMaker = new HokyFeedMaker();
  }

  public async publish(): Promise<Feed> {
    const url =
      'http://hoky.co.kr/template/1/categ_list.asp?categ_code=97&page=1&cv=6&orderOPT=0&pagesize=100';
    const contents = await this.mFetcher.fetch(url);
    const items = this.mParser.parse(contents);
    const feed = this.mFeedMaker.makeFeed(items);
    return feed;
  }
}
