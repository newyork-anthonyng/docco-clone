[![Travis](https://img.shields.io/travis/newyork-anthonyng/docco-lite.svg)](https://travis-ci.org/newyork-anthonyng/docco-lite)
[![Codecov](https://img.shields.io/codecov/c/github/newyork-anthonyng/docco-lite.svg)](https://codecov.io/gh/newyork-anthonyng/docco-lite)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

# Docco-lite
Made just for fun as part of my [deliberate practice](https://medium.com/@newyork.anthonyng/deliberate-practice-what-i-learned-from-reading-docco-7884b5979c6c).

Reimplementation of [`docco`](https://github.com/jashkenas/docco). `docco` supports many more languages (and is probably less buggy). `docco-lite` only supports `JavaScript`.

## Getting started

Install `docco-lite` into your project:
```shell
npm install --save-dev @newyork.anthonyng/docco-lite
```

To use `docco-lite` to create documentation for a file, `app.js`, run:
```shell
./node_modules/.bin/docco-lite app.js
```

See [here](http://newyork-anthonyng.github.io/docco-lite/) for an example of the documentation created by `docco-lite`.

## Contributing
This project uses [`commitizen`](https://github.com/commitizen/cz-cli) and [`nps`](https://github.com/kentcdodds/nps).
To commit, run:
```shell
npm start commit
```
