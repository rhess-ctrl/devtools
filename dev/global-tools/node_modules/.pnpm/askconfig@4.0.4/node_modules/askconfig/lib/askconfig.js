/**
 * Ask for configuration.
 * @function askconfig
 * @param {object} props - Values to ask.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.msg] - Message to print before interaction.
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const objnest = require('objnest')
const Question = require('./question')
const questionInterface = require('./question_interface')

/** @lends askconfig */
async function askconfig (props, options = {}) {
  const args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no longer supported. Use promise interface instead.')
  }
  props = args.shift()
  options = args.pop('object') || {}

  const {msg} = options
  if (msg) {
    [].concat(msg).forEach((msg) => {
      console.log(msg)
    })
  }

  const questions = Object.keys(props).map((key) => {
    return Question.new({
      key, default: props[key]
    })
  })

  const qi = questionInterface()
  const result = {}
  let i = 0
  for (const question of questions) {
    const answer = await new Promise((resolve, reject) =>
      qi.question(question.query(), (answer) => resolve(answer))
    )
    const key = question.key || i
    i++
    result[key] = String(answer || question.default).trim()
  }
  return new Promise((resolve) => {
    qi.on('close', () => resolve(objnest.expand(result)))
    qi.close()
  })
}

module.exports = askconfig
