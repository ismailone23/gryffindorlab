import assert from 'node:assert/strict'
import { calendlyToken } from '../src/lib/calendly.ts'
import { isSameOrigin } from '../src/lib/request-origin.ts'
import { readLimitedBody } from '../src/lib/read-limited-body.ts'

const oldAccessToken = process.env.CALENDLY_ACCESS_TOKEN
const oldApiKey = process.env.CALENDLY_API_KEY
try {
  delete process.env.CALENDLY_ACCESS_TOKEN
  process.env.CALENDLY_API_KEY = 'legacy'
  assert.equal(calendlyToken(), 'legacy')
  process.env.CALENDLY_ACCESS_TOKEN = 'preferred'
  assert.equal(calendlyToken(), 'preferred')
} finally {
  if (oldAccessToken === undefined) delete process.env.CALENDLY_ACCESS_TOKEN
  else process.env.CALENDLY_ACCESS_TOKEN = oldAccessToken
  if (oldApiKey === undefined) delete process.env.CALENDLY_API_KEY
  else process.env.CALENDLY_API_KEY = oldApiKey
}

const proxied = (origin) => new Request('http://localhost/api/contact', {
  headers: { origin, host: 'example.com', 'x-forwarded-proto': 'https' },
})
assert.equal(isSameOrigin(proxied('https://example.com')), true)
assert.equal(isSameOrigin(proxied('http://example.com')), false)
assert.equal(isSameOrigin(proxied('https://other.example')), false)

assert.equal(await readLimitedBody(new Request('https://example.com', {
  method: 'POST', body: 'éé',
}), 4), 'éé')
await assert.rejects(readLimitedBody(new Request('https://example.com', {
  method: 'POST', body: 'éé',
}), 3), RangeError)
console.log('Audit checks passed')
