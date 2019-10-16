import { QueryStringBuilder } from './QueryStringBuilder';
import { QueryStringObject, QueryStringParamConfig } from './contracts';

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
      paramName: 'por',
      defaultValue: 'tillos'
    },
    {
      paramName: 'la',
      defaultValue: 'segunda'
    },
    {
      paramName: 'wrights',
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
      paramName: ' s p a c e s     ',
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
      paramName: 'debug',
      defaultValue: true
    },
    {
      paramName: 'portillos_rating',
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
      paramName: 'should-be-false',
      defaultValue: false
    },
    {
      paramName: 'should-be-null',
      defaultValue: null
    },
    {
      paramName: 'should-be-0',
      defaultValue: 0
    },
    {
      paramName: 'should-be-undefined',
      defaultValue: 'undefined'
    },
    {
      paramName: 'should-have-no-value',
      defaultValue: ''
    },
    {
      paramName: 'should-have-no-value-again',
    }
  ];
  
  expected = '?should-be-false=false&should-be-null=null&should-be-0=0&should-be-undefined=undefined&should-have-no-value&should-have-no-value-again';
  queryString = new QueryStringBuilder().withConfig(configs).build().getString();
  expect(queryString).toBe(expected);
});

test('omits falsy values if specified', () => {

  configs = [
    {
      paramName: 'shouldn\'t-be-in-query-string-0',
      omitKeyWithFalsyValue: true
    },
    {
      paramName: 'shouldn\'t-be-in-query-string-1',
      defaultValue: '',
      omitKeyWithFalsyValue: true
    },
    {
      paramName: 'shouldn\'t-be-in-query-string-2',
      defaultValue: false,
      omitKeyWithFalsyValue: true
    },
    {
      paramName: 'shouldn\'t-be-in-query-string-3',
      primaryValue: false,
      omitKeyWithFalsyValue: true
    },
    {
      paramName: 'sbiqs-0',
      primaryValue: false,
      defaultValue: false,
      omitKeyWithFalsyValue: {
        primary: true,
        default: false
      }
    }
    ,
    {
      paramName: 'sbiqs-1',
      primaryValue: false,
      defaultValue: false,
      omitKeyWithFalsyValue: {
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
    paramName: 'test',
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
      paramName: 'test1',
      primaryValue: '',
      defaultValue: 'default'
    },
    {
      paramName: 'test2',
      primaryValue: false,
      defaultValue: 'default'
    },
    {
      paramName: 'test3',
      primaryValue: null,
      defaultValue: 'default'
    },
    {
      paramName: 'test4',
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
      paramName: 'test1',
      primaryValue: '',
      defaultValue: 'default',
      omitKeyWithFalsyValue: false
    },
    {
      paramName: 'test2',
      primaryValue: false,
      defaultValue: 'default',
      omitKeyWithFalsyValue: false
    },
    {
      paramName: 'test3',
      primaryValue: null,
      defaultValue: 'default',
      omitKeyWithFalsyValue: false
    },
    {
      paramName: 'test4',
      primaryValue: 'undefined',
      defaultValue: 'default',
      omitKeyWithFalsyValue: false
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
      paramName: 'test',
      overrideSearch: /^test$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    },
    {
      paramName: 'test2',
      overrideSearch: /^testtwo$|^test_2$|^test2$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    }
    ,
    {
      paramName: 'test3',
      overrideSearch: /^test3$/gi,
    },
    {
      paramName: 'test4',
      overrideSearch: /^not_there$/gi,
      omitKeyWithFalsyValue: true,
    },
    {
      paramName: 'test5',
      overrideSearch: /^not_there_with_primary$/gi,
      primaryValue: 'primary',
      defaultValue: 'default'
    }
    ,
    {
      paramName: 'test6',
      overrideSearch: /^not_there_with_default$/gi,
      defaultValue: 'default'
    }
  ];

  expected = '?test= `c h i p o t l e` &test2=king_coop&test3=pdq&test5=primary&test6=default'
  queryString = new QueryStringBuilder().withConfig(configs).withOverrides(overrideQueryString).build().getString();
  expect(queryString).toBe(expected);
});