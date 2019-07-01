'use strict'

const mustache = require('mustache')

addEventListener('fetch', event => {
  event.respondWith(main(event).then(
    res => res,
    err => new Response(`caught error (${err.stack})`, {
      status: 500
    })
  ))
})

const META_PREFIX = 'x-amz-meta-'

async function getRenderer (framing) {
  const response = await fetch(`_framing/${framing}`)
  if (!response.ok) {
    if (framing === 'default.html') {
      return (context, body) => body + '<h1>(framing not found)</h1>'
    } else {
      return getRenderer('default.html')
    }
  }

  const tpl = await response.text()
  return (context, body) => {
    return mustache.render(tpl, { body, ...context })
  }
}

async function main (event) {
  const response = await fetch(event.request)

  let body = response.body
  if (response.ok) {
    const context = [...response.headers].filter(
      ([key]) => key.startsWith(META_PREFIX)
    ).reduce((acc, [key, value]) => {
      acc[key.replace(META_PREFIX, '')] = value
      return acc
    }, {})

    if (context.framing) {
      const render = await getRenderer(context.framing)
      body = render(context, await response.text())
    }
  }

  const headers = new Headers([
    ...response.headers.filter(([key]) => !key.startsWith(META_PREFIX))]
  )

  headers.set('x-clacks-overhead', 'GNU Terry Pratchett')
  headers.set('meta', JSON.stringify({
    release: process.env.RELEASE
  }))

  return new Response(body, {
    statusText: response.statusText,
    status: response.status,
    headers
  })
}
