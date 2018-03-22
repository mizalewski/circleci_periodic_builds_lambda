'use strict'

const https = require('https')

const buildOptions = (event) => {
  const {vcsType, project, branch, circleToken} = event

  return {
    hostname: 'circleci.com',
    port: 443,
    path: `/api/v1.1/project/${vcsType}/${project}/tree/${branch}?circle-token=${circleToken}`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache'
    }
  }
}

const postContent = JSON.stringify({
  build_parameters: {
    RUN_NIGHTLY_BUILD: true,
    // add your build parameters here!
  }
})

exports.handler = (event, context, callback) => {
  const options = buildOptions(event)
  console.log(options)
  const req = https.request(options, (res) => {
    let body = ''

    console.log('statusCode:', res.statusCode)
    console.log('headers:', res.headers)

    if (res.statusCode !== 201) {
      context.fail('Build schedule failed')
      callback('error', res.statusCode)
    }

    res.on('data', (chunk) => body += chunk)
    res.on('end', () => {
      console.log('Successfully processed HTTPS response')
      context.succeed()
      callback(null, body)
    })
  })
  req.on('error', callback)
  req.write(postContent)
  req.end()
}
