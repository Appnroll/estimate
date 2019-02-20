const { Router } = require('express')
const router = new Router()

// Enable gzip compression
router.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

module.exports = router
