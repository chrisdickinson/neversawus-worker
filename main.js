'use strict'

addEventListener('fetch', event => {
  event.respondWith(main().then(
    res => res,
    err => new Response(`caught error (${err.stack})`, {
      status: 500
    })
  ))
})

async function main (event) {
  return new Response('hello world', {
    status: 200
  })
}
