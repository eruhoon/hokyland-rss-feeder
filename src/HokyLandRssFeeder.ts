import express from 'express';
import { HokyPublishDaemon } from './models/publish/HokyPublishDaemon';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const daemon = new HokyPublishDaemon();
    daemon.start();
    const app = express();
    const port = 11001;

    app.get('/rss', (_, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(daemon.getFeed().rss2());
    });

    app.get('/atom', (_, res) => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(daemon.getFeed().atom1());
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}
