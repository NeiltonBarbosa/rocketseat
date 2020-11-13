'use strict'

const { formatters } = use('Validator')

class Invite {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      invites: 'required|array',
      'invites.*': 'required|email'
    }
  }
}

module.exports = Invite
