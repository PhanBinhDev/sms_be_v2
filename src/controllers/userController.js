const { createController } = require('awilix-express')
// const { validateCreateUser } = require('../validate/userValidate')

function userController({ repository }) {
  const userServices = repository.userServices

  return {
    create: async (req, res) => {
      // try {
      //   const user = req.body
      //   const [status, result] = await userServices.createUser(user)
      //   if (status === null) {
      //     return res.status(400).json({
      //       status: 'fail',
      //       message: result
      //     })
      //   }
      //   return res.status(200).json({
      //     status: 'success',
      //     data: result
      //   })
      // } catch (e) {
      //   console.error(e)
      // }
    },
    retrieveAll: async (req, res) => {
      // try {
      //   const { userRole, limit, pageSize, page, gender } = req.params
      //   const query = {}
      //   if (userRole) {
      //     query.userRole = userRole
      //   }
      //   if (gender) {
      //     query.gender = gender
      //   }
      //   const options = {
      //     limit: parseInt(limit) || 10,
      //     skip: (parseInt(page) || 1 - 1) * parseInt(pageSize) || 0,
      //     page: parseInt(page),
      //     pageSize: parseInt(pageSize)
      //   }
      //   const [status, result] = await userServices.retrieveALLUsers(
      //     query,
      //     options
      //   )
      //   if (status === null) {
      //     return res.status(400).json({
      //       status: 'error',
      //       message: result
      //     })
      //   }
      //   return res.status(200).json({
      //     status: 'success',
      //     data: result
      //   })
      // } catch (e) {
      //   console.error(e)
      // }
    },

    retrieve: async (req, res) => {
      // try {
      //   const [status, result] = await userServices.retrieveUser(req.params.id)
      //   if (status === null) {
      //     return res.status(400).json({
      //       status: 'error',
      //       message: result
      //     })
      //   }
      //   return res.status(200).json({
      //     status: 'success',
      //     data: result
      //   })
      // } catch (e) {
      //   console.error(e)
      // }
    },
    update: async (req, res) => {},
    delete: async (req, res) => {}
  }
}

module.exports = createController(userController)
  .prefix('/api/user')
  .post('/', 'create', {
    // before: validateCreateUser
  })
  .get('/', 'retrieveAll')
  .get('/:id', 'retrieve')
  .patch('/:id', 'update')
  .delete('/:id', 'delete')
