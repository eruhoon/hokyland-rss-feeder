import { HttpFetcher } from './HttpFetcher';
import Axios from 'axios';
import iconv from 'iconv-lite';

export class SimpleHttpFetcher implements HttpFetcher {
  public async fetch(url: string): Promise<string> {
    const { data } = await Axios.get(url, { responseType: 'arraybuffer' });
    const contents = iconv.decode(data, 'euc-kr');
    return contents;
  }
}
