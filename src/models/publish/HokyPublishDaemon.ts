import { Daemon } from '../common/daemon/Daemon';
import { HokyFeedItem } from './HokyFeedItem';
import { HttpFetcher } from '../fetch/HttpFetcher';
import { HokyItemParser } from '../parse/HokyItemParser';
import { SimpleHttpFetcher } from '../fetch/SimpleUrlFetcher';
import { HokyItemParserImpl } from '../parse/HokyItemParserImpl';
import { HokyItem } from '../common/HokyItem';
import { HokyFeedMaker } from '../feed/HokyFeedMaker';
import { Feed } from 'feed';

export class HokyPublishDaemon implements Daemon {
  private static readonly UPDATE_INTERVAL = 5 * 60 * 1000;
  private mProgress: boolean;
  private mTimerId: number;
  private mFeedItems: HokyFeedItem[];

  private readonly mFetcher: HttpFetcher;
  private readonly mParser: HokyItemParser;
  private readonly mFeedMaker: HokyFeedMaker;

  public constructor() {
    this.mProgress = false;
    this.mTimerId = -1;
    this.mFeedItems = [];
    this.mFetcher = new SimpleHttpFetcher();
    this.mParser = new HokyItemParserImpl();
    this.mFeedMaker = new HokyFeedMaker();
  }

  public start(): void {
    if (this.mProgress) {
      return;
    }
    this.mProgress = true;
    this.startTimer();
  }

  public stop(): void {
    this.mProgress = false;
    clearTimeout(this.mTimerId);
  }

  public getFeed(): Feed {
    return this.mFeedMaker.makeFeed(this.mFeedItems);
  }

  private startTimer(): void {
    this.updateItems();
    this.mTimerId = setTimeout(() => {
      this.startTimer();
    }, HokyPublishDaemon.UPDATE_INTERVAL) as any;
  }

  private async updateItems(): Promise<void> {
    const items = await this.fetchItems();
    const filtered = this.mFeedItems.filter(feedItem =>
      items.some(item => feedItem.equalsToItem(item))
    );
    const toAdd = items
      .filter(item =>
        this.mFeedItems.every(feedItem => !feedItem.equalsToItem(item))
      )
      .map(item => new HokyFeedItem(item));
    this.mFeedItems = filtered.concat(toAdd);
  }

  private async fetchItems(): Promise<HokyItem[]> {
    const url =
      'http://hoky.co.kr/template/1/categ_list.asp?categ_code=97&page=1&cv=6&orderOPT=0&pagesize=100';
    const body = await this.mFetcher.fetch(url);
    const items = this.mParser.parse(body);
    return items;
  }
}
