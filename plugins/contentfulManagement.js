const contentful = require('contentful-management')
const defaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CMA_ACCESS_TOKEN: process.env.CTF_CMA_ACCESS_TOKEN
}

module.exports = {
  createClient (config = defaultConfig) {
    return contentful.createClient({
      accessToken: config.CTF_CMA_ACCESS_TOKEN
    })
  }
}
