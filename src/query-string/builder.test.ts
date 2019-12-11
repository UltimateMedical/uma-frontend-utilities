import QueryStringBuilder from './builder';
import queryStringParamConfigInterface from './queryStringParamConfigInterface';

let expected = '',
    queryString:string,
    configs:Array<queryStringParamConfigInterface> = [];

beforeEach(() => {
  configs = [];
  queryString = '';
  expected = 'xxx';
})

test('forms a valid query string from config object', () => {

  configs = [
    {
      key: 'por',
      default: 'tillos'
    },
    {
      key: 'la',
      default: 'segunda'
    },
    {
      key: 'wrights',
      default: 'bakery'
    }
  ];
  
  expected = '?por=tillos&la=segunda&wrights=bakery';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('does not encode special chars', () => {

  configs = [
    {
      key: ' s p a c e s     ',
      default: ' s   p   a   c   e   s  '
    }
  ];

  expected = '? s p a c e s     = s   p   a   c   e   s  '
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('handles non string types', () => {

  configs = [
    {
      key: 'debug',
      default: true
    },
    {
      key: 'portillos_rating',
      default: 10
    },
  ];

  expected = '?debug=true&portillos_rating=10';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('doesn\'t omit falsy values by default', () => {
  
  configs = [
    {
      key: 'should-be-false',
      default: false
    },
    {
      key: 'should-be-null',
      default: null
    },
    {
      key: 'should-be-0',
      default: 0
    },
    {
      key: 'should-be-undefined',
      default: 'undefined'
    },
    {
      key: 'should-have-no-value',
      default: ''
    },
    {
      key: 'should-have-no-value-again',
    }
  ];
  
  expected = '?should-be-false=false&should-be-null=null&should-be-0=0&should-be-undefined=undefined&should-have-no-value&should-have-no-value-again';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('omits falsy values if specified', () => {

  configs = [
    {
      key: 'shouldn\'t-be-in-query-string-0',
      excludeIfFalsy: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-1',
      default: '',
      excludeIfFalsy: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-2',
      default: false,
      excludeIfFalsy: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-3',
      primary: false,
      excludeIfFalsy: true
    },
    {
      key: 'sbiqs-0',
      primary: false,
      default: false,
      excludeIfFalsy: {
        primary: true,
        default: false
      }
    },
    {
      key: 'sbiqs-1',
      primary: false,
      default: false,
      excludeIfFalsy: {
        primary: false,
        default: true
      }
    }
  ];

  expected = '?sbiqs-0=false&sbiqs-1=false';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('primary overrides default', () => {

  configs = [{
    key: 'test',
    primary: 'primary',
    default: 'default'
  }];

  expected = '?test=primary';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('primary falls back to default if falsy', () => {

  configs = [
    {
      key: 'test1',
      primary: '',
      default: 'default'
    },
    {
      key: 'test2',
      primary: false,
      default: 'default'
    },
    {
      key: 'test3',
      primary: null,
      default: 'default'
    },
    {
      key: 'test4',
      primary: 'undefined',
      default: 'default'
    }
  ];

  expected = '?test1=default&test2=default&test3=default&test4=default';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('use falsy primaries if you want', () => {

  configs = [
    {
      key: 'test1',
      primary: '',
      default: 'default',
      excludeIfFalsy: false
    },
    {
      key: 'test2',
      primary: false,
      default: 'default',
      excludeIfFalsy: false
    },
    {
      key: 'test3',
      primary: null,
      default: 'default',
      excludeIfFalsy: false
    },
    {
      key: 'test4',
      primary: 'undefined',
      default: 'default',
      excludeIfFalsy: false
    }
  ];

  expected = '?test1&test2=false&test3=null&test4=undefined';
  queryString = new QueryStringBuilder(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('override query matches take precedence and are [sic]', () => {

  let overrideQueryString = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq';

  configs = [
    {
      key: 'test',
      override: /^test$/gi,
      primary: 'primary',
      default: 'default'
    },
    {
      key: 'test2',
      override: /^testtwo$|^test_2$|^test2$/gi,
      primary: 'primary',
      default: 'default'
    }
    ,
    {
      key: 'test3',
      override: /^test3$/gi,
    },
    {
      key: 'test4',
      override: /^not_there$/gi,
      excludeIfFalsy: true,
    },
    {
      key: 'test5',
      override: /^not_there_with_primary$/gi,
      primary: 'primary',
      default: 'default'
    }
    ,
    {
      key: 'test6',
      override: /^not_there_with_default$/gi,
      default: 'default'
    }
  ];

  expected = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq&test5=primary&test6=default'
  queryString = new QueryStringBuilder(configs).withOverrides(overrideQueryString).build().getString();
  expect(queryString).toBe(expected);
});