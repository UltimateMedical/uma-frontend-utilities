import { QueryStringBuilder } from './QueryStringBuilder';
import { QueryStringParamConfig } from './contracts';

let expected = '',
    queryString:string,
    configs:Array<QueryStringParamConfig> = [];

beforeEach(() => {
  configs = [];
  queryString = '';
  expected = 'xxx';
})

test('forms a valid query string from config object', () => {

  configs = [
    {
      key: 'por',
      defaultValue: 'tillos'
    },
    {
      key: 'la',
      defaultValue: 'segunda'
    },
    {
      key: 'wrights',
      defaultValue: 'bakery'
    }
  ];
  
  expected = '?por=tillos&la=segunda&wrights=bakery';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('encodes special chars', () => {

  configs = [
    {
      key: ' s p a c e s     ',
      defaultValue: ' s   p   a   c   e   s  '
    }
  ];

  expected = '?s%20p%20a%20c%20e%20s=s%20%20%20p%20%20%20a%20%20%20c%20%20%20e%20%20%20s'
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('handles non string types', () => {

  configs = [
    {
      key: 'debug',
      defaultValue: true
    },
    {
      key: 'portillos_rating',
      defaultValue: 10
    },
  ];

  expected = '?debug=true&portillos_rating=10';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('doesn\'t omit falsy values by default', () => {
  
  configs = [
    {
      key: 'should-be-false',
      defaultValue: false
    },
    {
      key: 'should-be-null',
      defaultValue: null
    },
    {
      key: 'should-be-0',
      defaultValue: 0
    },
    {
      key: 'should-be-undefined',
      defaultValue: 'undefined'
    },
    {
      key: 'should-have-no-value',
      defaultValue: ''
    },
    {
      key: 'should-have-no-value-again',
    }
  ];
  
  expected = '?should-be-false=false&should-be-null=null&should-be-0=0&should-be-undefined=undefined&should-have-no-value&should-have-no-value-again';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('omits falsy values if specified', () => {

  configs = [
    {
      key: 'shouldn\'t-be-in-query-string-0',
      excludeIfFalsyValue: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-1',
      defaultValue: '',
      excludeIfFalsyValue: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-2',
      defaultValue: false,
      excludeIfFalsyValue: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-3',
      primaryValue: false,
      excludeIfFalsyValue: true
    },
    {
      key: 'sbiqs-0',
      primaryValue: false,
      defaultValue: false,
      excludeIfFalsyValue: {
        primary: true,
        default: false
      }
    },
    {
      key: 'sbiqs-1',
      primaryValue: false,
      defaultValue: false,
      excludeIfFalsyValue: {
        primary: false,
        default: true
      }
    }
  ];

  expected = '?sbiqs-0=false&sbiqs-1=false';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('primary overrides default', () => {

  configs = [{
    key: 'test',
    primaryValue: 'primary',
    defaultValue: 'default'
  }];

  expected = '?test=primary';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('primary falls back to default if falsy', () => {

  configs = [
    {
      key: 'test1',
      primaryValue: '',
      defaultValue: 'default'
    },
    {
      key: 'test2',
      primaryValue: false,
      defaultValue: 'default'
    },
    {
      key: 'test3',
      primaryValue: null,
      defaultValue: 'default'
    },
    {
      key: 'test4',
      primaryValue: 'undefined',
      defaultValue: 'default'
    }
  ];

  expected = '?test1=default&test2=default&test3=default&test4=default';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('use falsy primaries if you want', () => {

  configs = [
    {
      key: 'test1',
      primaryValue: '',
      defaultValue: 'default',
      excludeIfFalsyValue: false
    },
    {
      key: 'test2',
      primaryValue: false,
      defaultValue: 'default',
      excludeIfFalsyValue: false
    },
    {
      key: 'test3',
      primaryValue: null,
      defaultValue: 'default',
      excludeIfFalsyValue: false
    },
    {
      key: 'test4',
      primaryValue: 'undefined',
      defaultValue: 'default',
      excludeIfFalsyValue: false
    }
  ];

  expected = '?test1&test2=false&test3=null&test4=undefined';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('override query matches take precedence and are [sic]', () => {

  let overrideQueryString = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq';

  configs = [
    {
      key: 'test',
      queryStringOverrideSearch: /^test$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    },
    {
      key: 'test2',
      queryStringOverrideSearch: /^testtwo$|^test_2$|^test2$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    }
    ,
    {
      key: 'test3',
      queryStringOverrideSearch: /^test3$/gi,
    },
    {
      key: 'test4',
      queryStringOverrideSearch: /^not_there$/gi,
      excludeIfFalsyValue: true,
    },
    {
      key: 'test5',
      queryStringOverrideSearch: /^not_there_with_primary$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    }
    ,
    {
      key: 'test6',
      queryStringOverrideSearch: /^not_there_with_default$/gi,
      defaultValue: 'default'
    }
  ];

  expected = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq&test5=primary&test6=default'
  queryString = new QueryStringBuilder().withConfig(configs).withOverrides(overrideQueryString).build().getString();
  expect(queryString).toBe(expected);
});