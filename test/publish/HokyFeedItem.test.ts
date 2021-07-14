import { HokyFeedItem } from '../../src/models/publish/HokyFeedItem';

test('HokyFeedItem should return field', () => {
  const feedItem = new HokyFeedItem({
    icon: 'icon',
    link: 'link',
    price: '1000',
    title: 'title',
  });

  expect(feedItem.getItem().icon).toBe('icon');
  expect(feedItem.getItem().link).toBe('link');
  expect(feedItem.getItem().price).toBe('1000');
  expect(feedItem.getItem().title).toBe('title');
});
