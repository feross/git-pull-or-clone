/*! git-pull-or-clone. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
module.exports = gitPullOrClone

const crossSpawn = require('cross-spawn')
const debug = require('debug')('git-pull-or-clone')
const fs = require('fs')

function gitPullOrClone (url, outPath, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  const depth = opts.depth == null ? 1 : opts.depth

  if (depth <= 0) {
    throw new RangeError('The "depth" option must be greater than 0')
  }

  fs.access(outPath, fs.R_OK | fs.W_OK, function (err) {
    if (err) {
      gitClone()
    } else {
      gitPull()
    }
  })

  function gitClone () {
    // --depth implies --single-branch
    const flag = depth < Infinity ? '--depth=' + depth : '--single-branch'
    const args = ['clone', flag, '--', url, outPath]
    debug('git ' + args.join(' '))
    spawn('git', args, {}, function (err) {
      if (err) err.message += ' (git clone) (' + url + ')'
      cb(err)
    })
  }

  function gitPull () {
    const args = depth < Infinity ? ['pull', '--depth=' + depth] : ['pull']
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
