const router = require('../../router')
const { fetchUsers } = require('./helpers')

router.get('/users', async (req, res, next) => {
  try {
    const { data: { members } } = await fetchUsers()
    res.json(members)
  } catch (e) {
    next(e)
  }
})
