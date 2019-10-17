# UMA Frontend Utilities
Welcome. Here's the repo for UMA's frontend utilities. Hopefully there's something
useful in here...

## Contributing
If you would like to contribute to this propject, there are just a few steps 
you need to take. 
  - `git clone` the repo
  - `cd` into the project root
  - `npm i`

That should be it.

## Development Environment
`npm run develop`

This command will start up the webpack dev server and provide you with hot reloading
while developing. Useful for beginning stagings and troubleshooting.

Additionally, in the file called `webpack.config.js`, you can uncomment the 
line that reads `dev: './src/index.js'` while you are developing. Then you have 
a nice little sandbox in `./src/index.js`.

## Testing
`npm run test`
This library uses [jest](https://jestjs.io/en/) for testing. It's important before the
release of a new module that we test to the best of our ability. This will decrease the
likely hood of bugs in the future and ensure that we know how our code works.

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
import { QueryStringParser as qsp } from 'uma-utilities';

const queryString = qsp.getQueryObject(window.location.search);
console.log(queryString);
```

#### QueryStringBuilder
Given an array of `QueryStringParamConfig`, the `QueryStringBuilder` can build a query 
string for you.

An example usage might look like: 

```javascript
import { QueryStringBuilder as qsb } from 'uma-utilities';

const configs = [
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
      primaryValue: 'cafe',
      defaultValue: 'bakery'
    },
    {
      paramName: 'this_param_passed_from_current_page_query',
      overrideSearch: /^test|tst$/gi
    }
  ];
  
  const queryString = new QueryStringBuilder().withConfig(configs).withOverrides(window.location.search).build().getString();
  console.log(queryString);
```

In this example, `overrideSearch` searches through the `key` values of an array of 
`QueryStringObject` provided by the `QueryStringParser`. This means you can just look for 
an exact value or values.