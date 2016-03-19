'use strict'
const co = require('co')
const chalk = require('chalk')
const figures = require('figures')
const spawn = require('cross-spawn')
const globalNodeModules = require('global-node-modules')

module.exports = co.wrap(function* (moduleNames, options) {
  options = options || {}
  const flags = flagify(options)
  const result = {}
  for (const moduleName of moduleNames) {
    try {
      const globalModulePath = yield globalNodeModules(moduleName)
      const localModulePath = `./node_modules/${moduleName}`
      const modulePath = options.global ? globalModulePath : localModulePath
      hr(`Installing ${moduleName}...`)
      require.resolve(modulePath)
      const appendMsg = options.global ? 'globally' : 'in current working directory'
      console.log(`${moduleName} is yet installed ${appendMsg}, skipped!`)
      result[moduleName] = 0
    } catch (e) {
      if (e.message.indexOf('Cannot find module') > -1) {
        const install = spawn.sync('npm', ['install', moduleName].concat(flags), {stdio: 'inherit'})
        result[moduleName] = install.status
      } else {
        console.log(e.stack)
      }
    }
  }
  return result
})

function flagify(options) {
  const res = []
  /* eslint-disable guard-for-in */
  for (const name in options) {
    const value = options[name]
    if (value) {
      const prefix = name.length === 1 ? '-' : '--'
      if (typeof value === 'boolean') {
        res.push(prefix + name)
      } else {
        res.push(prefix + name, value)
      }
    }
  }
  /* eslint-enable guard-for-in */
  return res
}

function hr(title) {
  const symbols = chalk.cyan(figures.pointer)
  console.log(`${symbols.repeat(5)} ${title}`)
}
