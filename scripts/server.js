/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const { kintone, cert } = require('kintone-dev-tools')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const configuration = require('../config/webpack.dev')

const envfile = path.resolve(__dirname, '.env.js')

const devServer = {
  host: 'localhost',
  port: 8080,
  hot: false,
  liveReload: true,
  allowedHosts: 'all',
  compress: true,
}

const outputJS = () => {
  const { entry } = configuration
  if (typeof entry === 'object' && !Array.isArray(entry)) return Object.keys(entry)
  return ['main']
}

const main = async () => {
  const compiler = webpack(configuration)
  const tls = cert.certificateFor(devServer.host)
  devServer.server = {
    type: 'https',
    options: {
      key: tls.private,
      cert: tls.cert,
    },
  }

  const config = new kintone.Env(envfile)
  const { env } = await config.load({
    expends: {
      type: 'input',
      message: 'Please enter appid',
      name: 'appid',
      validate: (input) => /^\+?[1-9][0-9]*$/.test(input),
    },
  })
  const client = new kintone.Client(env)

  const server = new WebpackDevServer(devServer, compiler)
  await server.start()
  const port = devServer.port === 443 ? '' : `:${devServer.port}`

  const url = new URL(configuration.output.filename, `https://${devServer.host}${port}`).href
  await client.customizeLinks(
    outputJS().map((file) => url.replace('[name]', file)),
    { appid: env.appid, upload: 'desktop' },
  )
}

main()
