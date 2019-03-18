import {createClient} from '~/plugins/contentfulManagement.js'

const client = createClient()
const spaceId = process.env.CTF_SPACE_ID

const setPostPropertyJson = async (payload) => {
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

const setPostProperty = async (entry, payload) => {
  entry.fields.title['ja-JP'] = payload.title
  entry.fields.slug['ja-JP'] = payload.slug
  entry.fields.description['ja-JP'] = payload.description
  entry.fields.author['ja-JP'] = {'sys': {'type': 'Link', 'linkType': 'Entry', 'id': '54LEoFW0jmuosCkqImiiW8'}}
  entry.fields.body['ja-JP'] = payload.body
  var now = new Date()
  var y = now.getFullYear()
  var m = ('0' + (now.getMonth() + 1)).slice(-2)
  var d = ('0' + now.getDate()).slice(-2)
  var h = ('0' + now.getHours()).slice(-2)
  var min = ('0' + now.getMinutes()).slice(-2)
  entry.fields.publishDate['ja-JP'] = y + '-' + m + '-' + d + 'T' + h + ':' + min + '+09:00'

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
  entry.fields.tags['ja-JP'] = tagsArray

  return entry
}

const getTags = async () => {
  var tags = {}
  const space = await client.getSpace(spaceId)
  const result = await space.getEntries({content_type: 'tag'})
  result.items.forEach((value, i) => {
    tags[value.fields.title['ja-JP']] = value.sys.id
  })
  return tags
}

const postTag = async (tag) => {
  const json = {'fields': {'title': {'ja-JP': tag}}}
  const space = await client.getSpace(spaceId)
  const result = await space.createEntry('tag', json)
  result.publish()
  return result.sys.id
}

const parseTags = async (tags) => {
  if (tags === '') return []
  var postTags = tags.split(', ')
  return postTags
}

const publishEntry = async (id) => {
  const space = await client.getSpace(spaceId)
  var entry = await space.getEntry(id)
  await entry.publish()
  return entry
}

export const state = () => ({
  posts: ''
})

export const actions = {
  async publishPost ({ commit }, { payload }) {
    const space = await client.getSpace(spaceId)
    const json = await setPostPropertyJson(payload)
    const entry = await space.createEntry('blogPost', json)
    publishEntry(entry.sys.id)
  },
  async putPost ({ commit }, { payload }) {
    const space = await client.getSpace(spaceId)
    var entry = await space.getEntry(payload.id)
    entry = await setPostProperty(entry, payload)
    await entry.update()
    publishEntry(payload.id)
  }
}
