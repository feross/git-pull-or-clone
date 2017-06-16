module.exports = gitPullOrClone

const crossSpawn = require('cross-spawn')
const debug = require('debug')('git-pull-or-clone')
const fs = require('fs')

function gitPullOrClone (url, outPath, cb) {
  fs.access(outPath, fs.R_OK | fs.W_OK, function (err) {
    if (err) {
      gitClone()
    } else {
      gitPull()
    }
  })

  function gitClone () {
    const args = [ 'clone', '--depth', 1, url, outPath ]
    debug('git ' + args.join(' '))
    spawn('git', args, {}, function (err) {
      if (err) err.message += ' (git clone) (' + url + ')'
      cb(err)
    })
  }

  function gitPull () {
    const args = [ 'pull', '--depth', 1 ]
    debug('git ' + args.join(' '))
    spawn('git', args, { cwd: outPath }, function (err) {
      if (err) err.message += ' (git pull) (' + url + ')'
      cb(err)
    })
  }
}

function spawn (command, args, opts, cb) {
  opts.stdio = debug.enabled ? 'inherit' : 'ignore'

  const child = crossSpawn(command, args, opts)
  child.on('error', cb)
  child.on('close', function (code) {
    if (code !== 0) return cb(new Error('Non-zero exit code: ' + code))
    cb(null)
  })
  return child
}
