import { HokyItemParser } from './HokyItemParser';
import { HokyItem } from '../common/HokyItem';
import cheerio from 'cheerio';

export class HokyItemParserImpl implements HokyItemParser {
  public parse(body: string): HokyItem[] {
    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    });
    const $items = $('ul.prdList>li');
    console.log($items.length);
    const host = 'https://hoky.co.kr';
    return $items
      .toArray()
      .map(e => $(e))
      .map($e => {
        const $anchor = $e.find('.prdImg a');
        const $description = $e.find('.description');

        const $image = $anchor.find('img').eq(0);
        const iconSrc = $image.attr('src');
        const icon = `https:${iconSrc}`;
        const title = $image.attr('alt');
        const link = `${host}${$anchor.attr('href')}`;

        const price = $description.attr('ec-data-price') + '원';
        console.log({
          title,
          link,
          icon,
          price,
        });
        return {
          title,
          link,
          icon,
          price,
        } as HokyItem;
      });
  }
}
