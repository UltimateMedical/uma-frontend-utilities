import QueryStringBuilderV2 from './builder';
import QueryStringParser from '../queryString/parser';
import { ParamSchema } from '../schemas';

let expected:    string        = "",
    queryString: string        = "",
    configs:     ParamSchema[] = [];

beforeEach(() => {
  configs = [];
  queryString = '';
  expected = 'xxx';
})

test('forms a valid query string from config object', () => {

  configs = [
    {
      key: 'por',
      value: 'tillos'
    },
    {
      key: 'la',
      value: 'segunda'
    },
    {
      key: 'wrights',
      value: 'bakery'
    }
  ];
  
  expected = '?por=tillos&la=segunda&wrights=bakery';
  queryString = new QueryStringBuilderV2(configs).build().getURLString();
  expect(queryString).toBe(expected);
});

test('does not encode special chars', () => {

  configs = [
    {
      key: ' s p a c e s     ',
      value: ' s   p   a   c   e   s  '
    }
  ];

  expected = '? s p a c e s     = s   p   a   c   e   s  '
  queryString = new QueryStringBuilderV2(configs).build().getURLString();
  expect(queryString).toBe(expected);
});

test('converts non-string types to string types when building URL string', () => {

  configs = [
    {
      key: 'debug',
      value: true
    },
    {
      key: 'portillos_rating',
      value: 10
    },
  ];

  expected = '?debug=true&portillos_rating=10';
  queryString = new QueryStringBuilderV2(configs).build().getURLString();
  expect(queryString).toBe(expected);
});

test('doesn\'t omit falsy values by default', () => {
  
  configs = [
    {
      key: 'should-be-false',
      value: false
    },
    {
      key: 'should-be-null',
      value: null
    },
    {
      key: 'should-be-0',
      value: 0
    },
    {
      key: 'should-be-undefined',
      value: 'undefined'
    },
    {
      key: 'should-have-no-value',
      value: ''
    },
    {
      key: 'should-have-no-value-again',
    }
  ];
  
  expected = '?should-be-false=false&should-be-null=null&should-be-0=0&should-be-undefined=undefined&should-have-no-value&should-have-no-value-again';
  queryString = new QueryStringBuilderV2(configs).build().getURLString();
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
      value: '',
      excludeIfFalsy: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-2',
      value: false,
      excludeIfFalsy: true
    },
    {
      key: 'shouldn\'t-be-in-query-string-3',
      value: 0,
      excludeIfFalsy: true
    },
    {
      key: 'sbiqs-0',
      value: null,
      excludeIfFalsy: true
    },
    {
      key: 'sbiqs-1',
      value: undefined,
      excludeIfFalsy: true
    },
  ];

  expected = '';
  queryString = new QueryStringBuilderV2(configs).build().getURLString();
  expect(queryString).toBe(expected);
});


test('override query matches take precedence and are [sic]', () => {

  let queryString = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq';

  configs = [
    {
      key: 'test',
      override: /^test$/gi,
      value: 'test'
    },
    {
      key: 'test2',
      override: /^testtwo$|^test_2$|^test2$/gi,
      value: 'test'
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
  ];

  // console.log(QueryStringParser.GetKVPairs(queryString));

  expected = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq'
  queryString = new QueryStringBuilderV2(configs)
                      .withOverrides({pairs: QueryStringParser.GetKVPairs(queryString)})
                      .build().getURLString();
  expect(queryString).toBe(expected);
});