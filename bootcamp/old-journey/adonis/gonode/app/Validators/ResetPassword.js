'use strict'

const Antl = use('Antl')

class ResetPassword {
  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
