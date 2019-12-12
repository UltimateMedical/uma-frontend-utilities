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