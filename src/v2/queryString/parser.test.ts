import { KeyValueSchema } from '../schemas';
import QueryStringParser from './parser';

test('turns a query string into an an array of objects with key/value pairs', () => {

  let queryString: string,
      parsedQuery: KeyValueSchema[];

  const expected: KeyValueSchema[] = [
    {
      key: "king",
      value: "coop"
    },
    {
      key: "bo",
      value: "dega"
    },
    {
      key: "la",
      value: "segunda"
    }
  ];

  // test a normal query string ...
  queryString = "?king=coop&bo=dega&la=segunda";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string without an initial "?"
  queryString = "king=coop&bo=dega&la=segunda";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string with a stray "&" at the end
  queryString = "king=coop&bo=dega&la=segunda&";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('creates an object with empty string as value for a URL param with no value', () => {

  let queryString: string,
      parsedQuery: KeyValueSchema[];

  const expected: KeyValueSchema[] = [
    {
      key: "portillos",
      value: ""
    },
    {
      key: "daily",
      value: "eats"
    },
    {
      key: "chicagopaulies",
      value: ""
    }
  ];

  // test a normal query string ...
  queryString = "?portillos&daily=eats&chicagopaulies";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('a query string with a value of "&"', () => {

  let queryString: string,
      parsedQuery: KeyValueSchema[];

  const expected: KeyValueSchema[] = [];

  // test a normal query string ...
  queryString = "?&";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string without the "?"
  queryString = "&";
  parsedQuery = QueryStringParser.GetKVPairs(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('.all() method returns all key/value pairs', () => {

  let queryString: string,
      parsedQuery: KeyValueSchema[];

  // test a normal query string ...
  queryString = "?test1&test2&test3&test4";
  parsedQuery = new QueryStringParser(queryString).all();
  expect(parsedQuery.length).toEqual(4);

});

test('.get() method returns one value', () => {

  let queryString: string,
      parsedQuery: KeyValueSchema[];

  // test a normal query string ...
  queryString = "?test1&test2&test3&test4=test";
  parsedQuery = new QueryStringParser(queryString).get('test4');
  expect(parsedQuery).toEqual('test');

  parsedQuery = new QueryStringParser(queryString).get('not-there');
  expect(parsedQuery).toEqual(undefined);

});

test(".get() method takes a default and returns it if the key isn't found", () => {

  let queryString: string,
      value:       any;

  const expected = 'default';

  queryString = "?testValue=test";
  value = new QueryStringParser(queryString).get('notThere', 'default');

  expect(value).toEqual(expected);
})

test(".get() method default doesn't override value in query string", () => {

  let queryString: string,
      value:       any;

  const expected = 'test';

  queryString = "?testValue=test";
  value = new QueryStringParser(queryString).get('testValue', 'default');

  expect(value).toEqual(expected);
});

test('.get() method default works with empty query strings', () => {
  let queryString: string,
      value:       any;

  const expected = 'default';

  queryString = "";
  value = new QueryStringParser(queryString).get('test', 'default');

  expect(value).toEqual(expected);
});

test(".get() method default handles booleans", () => {

  let queryString: string,
      value:       any;

  const expected = true;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', true);

  expect(value).toEqual(expected);
});

test(".get() method default handles numbers", () => {

  let queryString: string,
      value:       any;

  const expected = 0;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', 0);

  expect(value).toEqual(expected);
});

test(".get() method default handles undefined", () => {

  let queryString: string,
      value:       any;

  const expected = undefined;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', undefined);

  expect(value).toEqual(expected);
});