import { QueryStringBuilder } from './QueryStringBuilder';

test('forms a valid query string from config object', () => {

  const expected = '?por=tillos&lolis&s%20p%20a%20c%20e%20s=s%20%20%20p%20%20%20a%20%20%20c%20%20%20e%20%20%20s';
  const configs = [
          {
            paramName: 'por',
            defaultValue: 'tillos'
          },
          {
            paramName: 'lolis',
          },
          {
            paramName: ' s p a c e s     ',
            defaultValue: ' s   p   a   c   e   s  '
          }
        ];

  const queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);

});

test('handles non string types', () => {

  const expected = '?debug=true&portillos_rating=10';
  const configs = [
          {
            paramName: 'debug',
            defaultValue: true
          },
          {
            paramName: 'portillos_rating',
            defaultValue: 10
          },
        ];

  const queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);

});