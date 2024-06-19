const { createController } = require('awilix-express')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Logger = require('../helpers/logger')
const RequestHandler = require('../helpers/RequestHandler')

const logger = new Logger()
const requestHandler = new RequestHandler(logger)

function AuthController({ repository }) {
  const AuthServices = repository.AuthServices

  return {
    create: async (req, res) => {},
    retrieve: async (req, res) => {},
    update: async (req, res) => {},
    delete: async (req, res) => {}
  }
}

module.exports = createController(AuthController)
  .prefix('/api/template')
  .post('/', 'create')
  .get('/', 'retrieve')
  .patch('/:id', 'update')
  .delete('/:id', 'delete')
