import { HokyFeedMaker } from './models/feed/HokyFeedMaker';
import { HokyItemParserImpl } from './models/parse/HokyItemParserImpl';
import { SimpleHttpFetcher } from './models/fetch/SimpleUrlFetcher';
import express from 'express';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const url =
      'http://hoky.co.kr/template/1/categ_list.asp?categ_code=97&page=1&cv=6&orderOPT=0&pagesize=100';
    const contents = await new SimpleHttpFetcher().fetch(url);
    const items = new HokyItemParserImpl().parse(contents);
    const feed = new HokyFeedMaker().makeFeed(items);

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.get('/rss', (req, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(feed.rss2());
    });

    app.get('/atom', (req, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(feed.atom1());
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
