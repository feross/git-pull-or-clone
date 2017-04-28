const gitPullOrClone = require('../')
const path = require('path')
const rimraf = require('rimraf')
const test = require('tape')

const TMP = path.join(__dirname, '..', 'tmp')
const OUT_PATH = path.join(TMP, 'standard')

test('remove tmp folder', (t) => {
  rimraf.sync(TMP)
  t.end()
})

test('git clone', (t) => {
  t.plan(1)
  gitPullOrClone('git@github.com:feross/standard.git', OUT_PATH, (err) => {
    t.error(err)
  })
})

test('git pull', (t) => {
  t.plan(1)
  gitPullOrClone('git@github.com:feross/standard.git', OUT_PATH, (err) => {
    t.error(err)
  })
})
