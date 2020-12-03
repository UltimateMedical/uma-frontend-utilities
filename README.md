# UMA Frontend Utilities
Welcome. Here's the repo for UMA's frontend utilities. This package is meant to contain useful tools and
functions that we commonly use on the frontend.

## Installation
UMA Utils is a GitHub package, which means we just need to create or add a line in our project's `.npmrc` file.

Only add this line if it's not already there:

```bash
@ultimatemedical:registry=https://npm.pkg.github.com/
```

Once we specify where the package can be found, we can install it using the famililar NPM commands:

```bash
npm i @ultimatemedical/uma-utils
```

## Usage

Currently, the package provides three separate tools. We'll put some usage examples for each below. For more specific usage instructions, see the documentation.

### isFalsy
isFalsy is a utility function that checks to see whether or not a value is falsy.

Usage example:

```javascript
import isFalsy from "@ultimatemedical/uma-utils/dist/functions/isFalsy";

isFalsy(null)                    // true
isFalsy(0)                       // true
isFalsy(false)                   // true
isFalsy('')                      // true
isFalsy(undefined)               // true
isFalsy("undefined")             // true
isFalse(Number.isNaN(someValue)) // true if someValue is NaN

// in all other conditions, the function retures false
```

### QueryStringParser
A tool to interact with the query string and save specified values to localStorage.
```javascript
import QueryStringParser from "@ultimatemedical/uma-utils/dist/v2/queryString/parser";

// Let's say we visit the following URL:
// https://www.somewebsite.com/?time=noon&location=portillos&memo=lunch&keyOnly

const qsp = new QueryStringParser(window.location.search);

// get all query string parameters
qsp.all() 
// returns
[
  {
    key: "time",
    value: "noon"
  },
  {
    key: "location",
    value: "portillos"
  },
  {
    key: "memo",
    value: "lunch"
  },
  {
    key: "keyOnly",
    value: ""
  },
]

// get one query string parameter
qsp.get("time")                // "noon"
qsp.get("keyOnly")             // ""
qsp.get("notThere")            // undefined
qsp.get("notThere", "default") // "default"

// save query string parameters in local storage against a configuration
// https://www.somewebsite.com/?
const localStorageName  = "someName",
      now               = new Date(),
      expiry            = now.setMinutes(now.getMinutes() + 30),
      paramConfig       = [
                            {
                              key: "time",
                              value: "morning",
                              override: /^time$/
                            },
                            {
                              key: "location",
                              value: "arcoIris"
                            }
                          ];

qsp.saveToLocalStorage("name", expiry, paramConfig);

// The above method call will save a string like this in localStorage
// {"expires":"2020-12-03T21:14:22.234Z","pairs":[{"key":"time","value":"noon"}]}

// Notice how the value of the "time" key is "noon" and not the default
// of "morning" as specified in the param configuration.

// That's because we visited the following URL
// https://www.somewebsite.com/?time=noon&location=portillos&memo=lunch&keyOnly

// Also notice how "location" is also specified in the param config but
// was not saved in localStorage. That's because it has no "override" property.
```

### FormParamBuilder
A tool for resolving values between defaults and overrides. 
```javascript
import QueryStringParser from '@ultimatemedical/uma-utils/dist/v2/queryString/parser';
import FormParamBuilder from '@ultimatemedical/uma-utils/dist/v2/formParam/builder';

const LOCALSTORAGE_KEY = "someKey";

const params = [
  {
    key: "someParam",
    value: "someValue",
    override: /^test$/
  }
];

const qsp = new QueryStringParser(window.location.search);
qsp.saveToLocalStorage(LOCALSTORAGE_KEY, new Date(), params);

const fpb = new FormParamBuilder(params)
                  .withOverrides(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}"), {pairs: qsp.all()})
                  .build()

fpb.getKeyValuePairs();
```

## Contributing to the package

### Development Environment
`npm run develop`

This command will start up the webpack dev server and provide you with hot reloading while developing. 
Useful for beginning stagings and troubleshooting.

### Testing
`npm run test`

This library uses [jest](https://jestjs.io/en/) for testing. It's important before the release of a new module 
that we test to the best of our ability. This will decrease thelikely hood of bugs in the future and ensure that 
we know how our code works.

### Generating Documentation
`npm run docs`

Documentation will be generated using [doccomments](https://typedoc.org/guides/doccomments/), so make sure you comment up your code!

### Versioning and Releases
We're using the [npm-version](https://docs.npmjs.com/cli/version) package for versioning
and releases.