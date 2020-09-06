import { Feed } from 'feed';
import { HokyFeedItem } from '../publish/HokyFeedItem';

export class HokyFeedMaker {
  public makeFeed(feedItems: HokyFeedItem[]): Feed {
    const feed = this.makeMainFeed();
    feedItems.forEach((feedItem) => {
      const item = feedItem.getItem();
      const date = new Date(feedItem.getPublish());
      feed.addItem({
        title: item.title,
        id: item.link,
        link: item.link,
        description: `${item.title} ${item.price}`,
        content: `${item.title} ${item.price}`,
        author: [
          {
            name: 'eruhoon',
            email: 'eruhoon@gmail.com',
            link: 'https://github.com/eruhoon/hokyland-rss-feeder',
          },
        ],
        contributor: [
          {
            name: 'eruhoon',
            email: 'eruhoon@gmail.com',
            link: 'https://github.com/eruhoon/hokyland-rss-feeder',
          },
        ],
        date: date,
        image: item.icon,
      });
    });
    return feed;
  }

  private makeMainFeed(): Feed {
    const feed = new Feed({
      title: 'HokyLand Feed',
      description: 'the feed for subscribing hokyland',
      id: 'https://github.com/eruhoon/hokyland-rss-feeder',
      link: 'http://hoky.co.kr/',
      language: 'ko',
      image: 'http://www.hoky.co.kr/images/etc/%EC%B2%AB%EB%B2%88%EC%A7%B8.jpg',
      copyright: 'none',
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
