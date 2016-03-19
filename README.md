# npmin [![NPM version](https://img.shields.io/npm/v/npmin.svg)](https://npmjs.com/package/npmin) [![NPM downloads](https://img.shields.io/npm/dm/npmin.svg)](https://npmjs.com/package/npmin) [![Build Status](https://img.shields.io/circleci/project/egoist/npmin/master.svg)](https://circleci.com/gh/egoist/npmin)

> A minimal implementation of `npm install` for programmatic use.

## Install

```bash
$ npm install --save npmin
```

## Usage

```js
const npmin = require('npmin')

const options = {verbose: true}

npmin(['express', 'co'], options)
  .then(result => {
    console.log(result.express)
    //=> success: 0
    console.log(result.co)
    //=> failed: 1
  })
```

## API

### npmin(input, [options])

#### input

Type: `array`

A list of modules you wanna install.

#### options

Type: `object`

The options to run `npm install` with, support all `npm install` opionts.

## License

MIT © [EGOIST](https://github.com/egoist)
