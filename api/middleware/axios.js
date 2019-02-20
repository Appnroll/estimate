const { proxy } = require('../../nuxt.config')
const axios = require('axios')

axios.interceptors.request.use(config => {
  Object.keys(proxy).forEach(key => {
    const options = proxy[key]
    let url = config.url
    if (config.url.startsWith(key)) {
      config.baseURL = options.target
      if (options.pathRewrite) {
        Object.keys(options.pathRewrite).forEach(regex => {
          const replacement = options.pathRewrite[regex]
          url = url.replace(new RegExp(regex, 'g'), replacement)
        })
      }
      config.url = url
    }
  })
  return config
}, error => {
  return Promise.reject(error)
})

module.exports = axios
