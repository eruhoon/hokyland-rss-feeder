import express from 'express';
import { HokyPublishDaemon } from './models/publish/HokyPublishDaemon';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const daemon = new HokyPublishDaemon();
    daemon.start();
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.get('/rss', (req, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(daemon.getFeed().rss2());
    });

    app.get('/atom', (req, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(daemon.getFeed().atom1());
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
