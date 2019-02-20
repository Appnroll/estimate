const axios = require('../../middleware/axios')
require('dotenv').config()

const { SLACK_TOKEN } = process.env

const fetchUsers = async () => {
  return await axios.get('/slack/users.list', {
    params: {
      token: SLACK_TOKEN
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

module.exports = {
  fetchUsers
}
