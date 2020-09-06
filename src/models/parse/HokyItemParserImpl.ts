import { HokyItemParser } from './HokyItemParser';
import { HokyItem } from '../common/HokyItem';
import cheerio from 'cheerio';

export class HokyItemParserImpl implements HokyItemParser {
  public parse(body: string): HokyItem[] {
    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    });
    const $titleTable = $('table[cellpadding=5][width=70]');
    console.log($titleTable.length);
    const host = 'http://hoky.co.kr';
    return $titleTable
      .toArray()
      .map((e) => $(e))
      .map(($e) => $e.parent().parent())
      .filter(($e) => $e.text().trim().length > 0)
      .map(($e) => {
        const $title = $e.find('a');
        const title = $title.text();
        const link = `${host}/template/1/${$title.attr('href')}`;
        const $image = $e.find('img');
        const iconSrc = $image.attr('src');
        const icon = `${host}${iconSrc}`;
        const $price = $e.find('div[align=center] font[color=#FF0000]');
        const price = $price.text();
        return {
          title,
          link,
          icon,
          price,
        } as HokyItem;
      });
  }
}
