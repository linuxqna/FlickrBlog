# Setup

1. Init package.json
```shell
$ npm init
```

2. Install react and redux npm packages
```shell
$ npm install --save express express-session react react-dom redux react-redux redux-thunk redux-logger
```

3. Install Grand and purest related npm packages
```shell
$ npm install --save grant-express purest @purest/providers isomorphic-fetch
```

4. Install homebrew. Then install MongoDB and related npm packages
```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install mongodb
$ sudo mkdir -p /data/db
$ sudo chown jwseo /data/db
$ mongod
$ npm install --save mongodb connect-mongo
```

4. Install webpack and babel for es6.

We are going to use babel-node which compiles ES6 code before running it.
```shell
$ npm install --save-dev webpack babel-loader babel-cli babel-preset-es2015 babel-preset-react
```
Then we can add `npm start` script in `package.json`

```diff
  "scripts": {
+   "start": "babel-node src/index.js --presets es2015"
  }
```

5. Install webpack css loader

``` shell
$ npm install style-loader css-loader --save-dev
```

6. Install classnames loader

``` shell
$ npm install --save classnames
$ npm install --save-dev classnames-loader
```

7. Install json loader
``` shell
$ npm install --save-dev json-loader
```
