const gitPullOrClone = require('../')
const path = require('path')
const rimraf = require('rimraf')
const test = require('tape')

const TMP_PATH = path.join(__dirname, '..', 'tmp')
const OUT_PATH = path.join(TMP_PATH, 'standard')
const REPO_URL = 'https://github.com/feross/git-pull-or-clone.git'

test('remove tmp folder', (t) => {
  rimraf.sync(TMP_PATH)
  t.end()
})

test('git clone', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH, (err) => {
    t.error(err)
  })
})

test('git pull', (t) => {
  t.plan(1)
  gitPullOrClone(REPO_URL, OUT_PATH, (err) => {
    t.error(err)
  })
})
