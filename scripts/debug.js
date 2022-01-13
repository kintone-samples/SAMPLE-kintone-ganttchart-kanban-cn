/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const { kintone, server, DB, io } = require('kintone-dev-tools')
const path = require('path')
const configuration = require('../config/webpack.prod')

const envfile = path.resolve(__dirname, '.env.js')
const serverOption = {
  static: path.join(__dirname, '../dist'),
  port: 8081,
}

const main = async () => {
  let hash

  io.emptyDirSync(serverOption.static)
  const db = new DB(serverOption.static)
  await db.init()

  configuration.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: `https://localhost${serverOption.port === 443 ? '' : `:${serverOption.port}`}/`,
      fileContext: '.',
    }),
  )
  configuration.watch = true
  configuration.watchOptions = { aggregateTimeout: 200, poll: 1000, ignored: /node_modules/ }

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
  server.start(serverOption)

  webpack(configuration, async (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err || stats.toString({ colors: true }))
    } else if (hash !== stats.hash) {
      hash = stats.hash
      console.log(stats.toString({ colors: true }))

      const old = db.db
      await db.init()
      const files = []
      db.db.forEach((value, key) => {
        if (!old.has(key) || old.get(key) !== value) files.push(key)
      })
      console.log(files)
      if (files.length > 0) {
        await client.customizeFiles(files, { appid: env.appid, upload: 'desktop' })
      }
    }
  })
}

main()
