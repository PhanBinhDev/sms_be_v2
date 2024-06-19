const { asValue, asFunction, createContainer } = require('awilix')
const { MongoClient, ServerApiVersion } = require('mongodb')
class Database {
  constructor(configurations) {
    this.configurations = configurations
  }

  async connect() {
    const client = new MongoClient(this.configurations.mongoDB.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      },
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    const database = client.db(this.configurations.mongoDB.database)

    // Ping database
    try {
      await database.command({ ping: 1 })
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!'
      )
    } catch (e) {
      console.error('Error pinging MongoDB:', e)
    }

    // Disconnect mongoDB when app exits
    process.on('exit', async () => {
      await client.close()
      console.log('Disconnected from MongoDB')
    })

    return {
      client,
      database,
      usersCollection: database.collection('usersCollection'),
      rolesCollection: database.collection('rolesCollection'),
      permissionResourcesCollection: database.collection(
        'permissionResourcesCollection'
      )
    }
  }
}

const database = new Database(require('../config'))

const container = async (configurations) => {
  const container = createContainer()
  // Define database
  container.register({
    database: asFunction(async () => {
      const db = new Database(configurations)
      return await db.connect()
    })
  })

  // // Define services
  const templateServices = require('./services/templateServices')({
    config: configurations,
    database: await container.resolve('database')
  })

  container.register({
    repository: asValue({
      templateServices
    })
  })

  return container
}

module.exports = {
  container,
  database
}
