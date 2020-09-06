import { HokyItem } from '../common/HokyItem';

export class HokyFeedItem {
  private mItem: HokyItem;
  private mPublish: number;

  public constructor(item: HokyItem) {
    this.mItem = item;
    this.mPublish = new Date().getTime();
  }

  public getItem(): HokyItem {
    return this.mItem;
  }

  public getPublish(): number {
    return this.mPublish;
  }

  public equalsToItem(item: HokyItem): boolean {
    return (
      this.mItem.icon === item.icon &&
      this.mItem.link === item.link &&
      this.mItem.price === item.price &&
      this.mItem.title === item.title
    );
  }
}
