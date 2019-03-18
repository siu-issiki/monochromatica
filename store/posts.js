import axios from 'axios'

const accessToken = process.env.CTF_CDA_ACCESS_TOKEN
const adminToken = process.env.CTF_CMA_ACCESS_TOKEN

const setPostProperty = async (payload) => {
  var json = { 'fields': {} }
  json.fields.title = {'ja-JP': payload.title}
  json.fields.slug = {'ja-JP': payload.slug}
  json.fields.description = {'ja-JP': payload.description}
  json.fields.body = {'ja-JP': payload.body}
  json.fields.author = {'ja-JP': {'sys': {'type': 'Link', 'linkType': 'Entry', 'id': '54LEoFW0jmuosCkqImiiW8'}}}
  var now = new Date()
  var y = now.getFullYear()
  var m = ('0' + (now.getMonth() + 1)).slice(-2)
  var d = ('0' + now.getDate()).slice(-2)
  var h = ('0' + now.getHours()).slice(-2)
  var min = ('0' + now.getMinutes()).slice(-2)
  json.fields.publishDate = {'ja-JP': y + '-' + m + '-' + d + 'T' + h + ':' + min + '+09:00'}

  const tags = await getTags()
  const postTags = await parseTags(payload.tags)
  var tagsArray = []
  for (let i in postTags) {
    var value = postTags[i]
    if (!tags[value]) {
      tagsArray[i] = {
        'sys': {
          'type': 'Link',
          'linkType': 'Entry',
          'id': await postTag(value)
        }
      }
    } else {
      tagsArray[i] = {
        'sys': {
          'type': 'Link',
          'linkType': 'Entry',
          'id': tags[value]
        }
      }
    }
  }
  json.fields.tags = {'ja-JP': tagsArray}
  return json
}

const getTags = async () => {
  var tags = {}
  const url = 'https://cdn.contentful.com/spaces/kup205fov2fl/environments/master/entries?content_type=tag&access_token=' + accessToken
  const result = await axios.get(url).catch(function (error) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  })
  result.data.items.forEach((value, i) => {
    tags[value.fields.title] = value.sys.id
  })
  return tags
}

const postTag = async (tag) => {
  var url = 'https://api.contentful.com/spaces/kup205fov2fl/environments/master/entries'
  var headers = {
    'Authorization': 'Bearer ' + adminToken,
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-Content-Type': 'tag'
  }
  const json = {'fields': {'title': {'ja-JP': tag}}}
  const result = await axios({
    method: 'POST',
    url: url,
    headers: headers,
    data: json
  }).catch(function (error) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  })
  await publishEntry(result.data.sys.id)
  return result.data.sys.id
}

const parseTags = async (tags) => {
  if (tags === '') return []
  var postTags = tags.split(', ')
  return postTags
}

const publishEntry = async (id) => {
  const url = 'https://api.contentful.com/spaces/kup205fov2fl/environments/master/entries/' + id + '/published'
  const headers = {
    'Authorization': 'Bearer ' + adminToken,
    'X-Contentful-Version': '1'
  }
  await axios({
    method: 'PUT',
    url: url,
    headers: headers
  }).catch(function (error) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  })
}

export const state = () => ({
  posts: ''
})

export const actions = {
  async publishPost ({ commit }, { payload }) {
    var json = await setPostProperty(payload)
    var url = 'https://api.contentful.com/spaces/kup205fov2fl/environments/master/entries'
    var headers = {
      'Authorization': 'Bearer ' + adminToken,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-Content-Type': 'blogPost'
    }
    console.log(json)
    const result = await axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: json
    }).catch(function (error) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    })
    if (payload.publish) await publishEntry(result.data.sys.id)
  }
}
