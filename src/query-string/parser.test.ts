import QueryStringParser from './parser';

test('turns a query string into an an array of objects with key/value pairs', () => {

  let queryString,
      parsedQuery;

  const expected:Array<object> = [
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
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string without an initial "?"
  queryString = "king=coop&bo=dega&la=segunda";
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string with a stray "&" at the end
  queryString = "king=coop&bo=dega&la=segunda&";
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('creates an object with empty string as value for a URL param with no value', () => {

  let queryString,
      parsedQuery;

  const expected:Array<object> = [
    {
      key: "portillos",
      value: ""
    },
    {
      key: "daily",
      value: "eats"
    },
    {
      key: "panera",
      value: ""
    }
  ];

  // test a normal query string ...
  queryString = "?portillos&daily=eats&panera";
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('a query string with a value of "&"', () => {

  let queryString,
      parsedQuery;

  const expected:Array<object> = [];

  // test a normal query string ...
  queryString = "?&";
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

  // test a query string without the "?"
  queryString = "&";
  parsedQuery = QueryStringParser.parse(queryString);
  expect(parsedQuery).toEqual(expected);

});

test('.all() method returns all key/value pairs', () => {

  let queryString,
      parsedQuery;

  // test a normal query string ...
  queryString = "?test1&test2&test3&test4";
  parsedQuery = new QueryStringParser(queryString).all();
  expect(parsedQuery.length).toEqual(4);

});

test('.get() method returns one value', () => {

  let queryString,
      parsedQuery;

  // test a normal query string ...
  queryString = "?test1&test2&test3&test4=test";
  parsedQuery = new QueryStringParser(queryString).get('test4');
  expect(parsedQuery).toEqual('test');

  parsedQuery = new QueryStringParser(queryString).get('not-there');
  expect(parsedQuery).toEqual(null);

});

test(".get() method takes a default and returns it if the key isn't found", () => {

  let queryString,
      value;

  const expected = 'default';

  queryString = "?testValue=test";
  value = new QueryStringParser(queryString).get('notThere', 'default');

  expect(value).toEqual(expected);
})

test(".get() method default doesn't override value in query string", () => {

  let queryString,
      value;

  const expected = 'test';

  queryString = "?testValue=test";
  value = new QueryStringParser(queryString).get('testValue', 'default');

  expect(value).toEqual(expected);
});

test('.get() method default works with empty query strings', () => {
  let queryString,
      value;

  const expected = 'default';

  queryString = "";
  value = new QueryStringParser(queryString).get('test', 'default');

  expect(value).toEqual(expected);
});

test(".get() method default handles booleans", () => {

  let queryString,
      value;

  const expected = true;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', true);

  expect(value).toEqual(expected);
});

test(".get() method default handles numbers", () => {

  let queryString,
      value;

  const expected = 0;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', 0);

  expect(value).toEqual(expected);
});

test(".get() method default handles undefined", () => {

  let queryString,
      value;

  const expected = undefined;

  queryString = "";
  value = new QueryStringParser(queryString).get('testValue', undefined);

  expect(value).toEqual(expected);
});