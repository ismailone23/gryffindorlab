import assert from 'node:assert/strict'

const url = new URL('/api/contact', process.env.CONTACT_CHECK_URL || 'http://localhost:3000')
const valid = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  service: 'A bit of everything',
  idea: 'Please discuss a new website project with me.',
}

async function status(body, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
  return response.status
}

assert.equal(await status({ ...valid, idea: 'short' }), 400)
assert.equal(await status({ ...valid, website: 'bot' }), 204)
assert.equal(await status(valid, { origin: 'https://invalid.example' }), 403)
console.log('Contact request checks passed')
