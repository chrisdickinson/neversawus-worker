'use strict'

addEventListener('fetch', event => {
  event.respondWith(main(event).then(
    res => res,
    err => new Response(`caught error (${err.stack})`, {
      status: 500
    })
  ))
})

async function main (event) {
  const response = fetch(event.request)
  const headers = new Headers(response.headers)
  if (event.request.headers.get('user-agent').includes(process.env.SHARED_SECRET)) {
    headers.set('meta', JSON.stringify({
      release: process.env.RELEASE
    }))
  }

  return new Response(response.body, {
    statusText: response.statusText,
    status: response.status,
    headers
  })
}
