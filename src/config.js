const env = process.env

const config = {
  app: {
    port: parseInt(env.PORT, 10) || 3000,
    appName: process.env.APP_NAME || 'SMS',
    env: process.env.NODE_ENV || 'development'
  },
  mongoDB: {
    uri:
      env.MONGODB_URL ||
      'mongodb+srv://binhphandev:g543Mgb7U1gxwpvX@clustersms.ssss7cv.mongodb.net/',
    database: env.DATABASE || 'sampleDB'
  }
}

module.exports = config
