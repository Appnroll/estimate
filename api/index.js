const router = require('./router')
const path = require('path')
const fs = require('fs')

const routesPath = path.join(__dirname, './routes/')

fs.readdir(routesPath, (err, files) => {
  if (err) {
    console.error('Could not list routes directory: ', err)
    process.exit(1)
  }
  files.forEach(file => {
    require(`${routesPath}/${file}`)
  })
})

module.exports = router
