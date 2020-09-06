import { Feed } from 'feed';
import { HokyItem } from '../common/HokyItem';

export class HokyFeedMaker {
  public makeFeed(items: HokyItem[]): Feed {
    const feed = this.makeMainFeed();
    items.forEach((item) => {
      feed.addItem({
        title: item.title,
        id: item.link,
        link: item.link,
        description: `${item.title} ${item.price}`,
        content: `${item.title} ${item.price}`,
        author: [
          {
            name: 'eruhoon',
            email: 'eruhoon@gmail.copm',
            link: 'https://github.com/eruhoon/hokyland-rss-feeder',
          },
        ],
        contributor: [
          {
            name: 'eruhoon',
            email: 'eruhoon@gmail.copm',
            link: 'https://github.com/eruhoon/hokyland-rss-feeder',
          },
        ],
        date: new Date(),
        image: item.icon,
      });
    });
    return feed;
  }

  private makeMainFeed(): Feed {
    const feed = new Feed({
      title: 'Feed Title',
      description: 'This is my personal feed!',
      id: 'http://example.com/',
      link: 'http://example.com/',
      language: 'ko',
      image: 'http://example.com/image.png',
      favicon: 'http://example.com/favicon.ico',
      copyright: 'eruhoon',
      generator: 'eruhoon', // optional, default = 'Feed for Node.js'
      feedLinks: {
        json: 'https://example.com/json',
        atom: 'https://example.com/atom',
      },
      author: {
        name: 'eruhoon',
        email: 'eruhoon@gmail.com',
        link: 'https://github.com/eruhoon/hokyland-rss-feeder',
      },
    });
    return feed;
  }
}
