# UMA Frontend Utilities
Welcome. Here's the repo for UMA's frontend utilities. Hopefully there's something useful in here...
We use this repo as a place to store shared functionality between UMA sites.

## Contributing
If you would like to contribute to this propject, there are just a few steps you need to take. 
  - `git clone` the repo
  - `cd` into the project root
  - `npm i`

That should be it.

## Development Environment
`npm run develop`

This command will start up the webpack dev server and provide you with hot reloading while developing. 
Useful for beginning stagings and troubleshooting.

## Testing
`npm run test`
This library uses [jest](https://jestjs.io/en/) for testing. It's important before the release of a new module 
that we test to the best of our ability. This will decrease thelikely hood of bugs in the future and ensure that 
we know how our code works.

## Versioning and Releases
We're using the [npm-version](https://docs.npmjs.com/cli/version) package for versioning
and releases.

## Included Packages

### Query String Utils
`./src/query-string-utils`

The query string utils contain tools to build and read query strings. Currently, for more
specific implementation details you'll have to see the code.

#### QueryStringParser
Given a query string, the `QueryStringParser` can split it up into an array of `QueryStringObject`.

An example usage might look like:

```javascript
import qsp from '@ultimatemedical/uma-utils/dist/query-string/parser';

const parser = new qsp(window.location.search);
console.log(qsp.all());
console.log(qsp.get('param-name'));
```

#### QueryStringBuilder
Given an array of `QueryStringParamConfig`, the `QueryStringBuilder` can build a query 
string for you.

What's so great about the `QueryStringBuilder`? UMA's form system is dynamic. For example,
we have initial parameters that can be then changed at the page level or by values provided
in the query string. The `QueryStringBuilder` allows us to specify an intent for each param
using only a configuration. The config is compiled before a form is submitted.

The QueryStringParamConfig iterface looks like this:
```javascript
interface QueryStringParamConfigInterface {
  key:string;
	override?:RegExp
	primary?:string|boolean|number|null
  default?:string|boolean|number|null
  excludeIfFalsy?: { primary?:boolean, default?:boolean }|boolean;
}
```

An example usage might look like: 

```javascript
import qsb from '@ultimatemedical/uma-utils/dist/query-string/builder';

const configs = [
    {
      key: 'por',
      default: 'tillos'
    },
    {
      paramName: 'la',
      default: 'segunda'
    },
    {
      key: 'wrights',
      primary: 'cafe',
      default: 'bakery'
    },
    {
      key: 'this_param_passed_from_current_page_query',
      override: /^test|tst$/gi
    },
    {
      key: 'will-not-show-up-in-query-string',
      default: false,
      excludeIfFalsy: true
    },
    {
      key: 'will-not-show-up-in-query-string-2',
      excludeIfFalsy: {
        primary: true,
        default: true
      }
    }

  ];
  
  // get string
  const queryString = new qsb().withConfig(configs).withOverrides(window.location.search).build().getString();
  console.log(queryString);

  // get objects
  const objects = new qsb().withConfig(configs).withOverrides(window.location.search).build().getObjects();
  console.log(objects);
```

In this example, `override` searches through the `key` values of an array of 
`QueryStringObject` provided by the `QueryStringParser`. This means you can just look for an exact value or values.