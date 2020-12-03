import QueryStringParser from '../src/v2/queryString/parser';
import FormParamBuilder from '../src/v2/formParam/builder';
import isFalsy from '../dist/functions/isFalsy'

const LOCALSTORAGE_KEY = "uma:trace";

const params = [
  {
    key: "Zipcode",
    value: "00000",
    override: /^zip$/
  }
];

const qsp = new QueryStringParser(window.location.search);
qsp.saveToLocalStorage(LOCALSTORAGE_KEY, new Date(), params);

const fpb = new FormParamBuilder(params)
              .withOverrides(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}"), {pairs: qsp.all()})
              .build()

console.log(fpb.getKeyValuePairs());