import Axios from 'axios';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';

export class HokyLandRssFeeder {
  public async main(): Promise<void> {
    const url =
      'http://hoky.co.kr/template/1/categ_list.asp?categ_code=97&page=1&orderOPT=2&pagesize=100';

    const { data } = await Axios.get(url, { responseType: 'arraybuffer' });
    const contents = iconv.decode(data, 'euc-kr');
    const $ = cheerio.load(contents, {
      normalizeWhitespace: true,
    });
    console.log(
      $('table[cellpadding=5]')
        .toArray()
        .map((e) => $(e))
        .map(($e) => $e.parent().parent())
        .filter(($e) => $e.text().trim().length > 0)
        .forEach(($e) => {
          // const $entry = $(e).parent().parent();
          // console.log($e.children().length);
          // console.log($e.html());
          const $image = $e.find('img');
          const icon = $image.attr('src');
          // console.log($entry.html());
          // console.log('--');
          console.log({
            icon,
          });
          // const $tds = $entry.;
          // console.log($tds.length);
          // const $title = $tds.eq(1).find('a');
          // const link = $title.attr('href');
          // const host = 'http://hoky.co.kr';
          // const icon = `${host}${$(e).attr('src')}`;
          // console.log({
          //   link,
          //   icon,
          // });
        })
    );
  }
}
