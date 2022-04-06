# git-pull-or-clone [![ci][ci-image]][ci-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[ci-image]: https://img.shields.io/github/workflow/status/feross/git-pull-or-clone/ci/master
[ci-url]: https://github.com/feross/git-pull-or-clone/actions
[npm-image]: https://img.shields.io/npm/v/git-pull-or-clone.svg
[npm-url]: https://npmjs.org/package/git-pull-or-clone
[downloads-image]: https://img.shields.io/npm/dm/git-pull-or-clone.svg
[downloads-url]: https://npmjs.org/package/git-pull-or-clone

### Ensure a git repo exists on disk and that it's up-to-date

## Install

```
npm install git-pull-or-clone
```

## Usage

```js
const gitPullOrClone = require('git-pull-or-clone')

gitPullOrClone('git@github.com:feross/standard.git', '/path/to/destination', (err) => {
  if (err) throw err
  console.log('SUCCESS!')
})
```

## API

### `gitPullOrClone(url, outPath[, options], callback)`

Ensure a git repo exists on disk and that it's up-to-date.

Clones the git repo specified by `url` to the path `outPath`. If the repo already exists on disk,
then a pull is performed to update the repo instead.

The git repo is shallowly cloned by default. To make a complete clone, set `options.depth` to `Infinity`. If the git repo was previously cloned shallowly, it remains shallow.

When the operation is finished, `callback` is called. The first argument to `callback` is either
`null` or an `Error` object if an error occurred.

## License

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
