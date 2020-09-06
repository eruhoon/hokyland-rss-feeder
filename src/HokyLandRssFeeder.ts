import express from 'express';
import { HokyPublisher } from './models/publish/HokyPublisher';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const feed = await new HokyPublisher().publish();
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
