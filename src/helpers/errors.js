const { extend } = require('lodash').extend

module.exports = {
  BadRequest: {
    error: 'Bad request',
    status: 400
  },
  Unauthorized: {
    error: 'Unauthorized',
    status: 401
  },
  Forbidden: {
    error: 'Forbidden',
    status: 403
  },
  NotFound: {
    error: 'Not found',
    status: 404
  },
  UnProcessableEntity: {
    error: 'Unprocessable entity',
    status: 422
  },
  InternalServerError: {
    error: 'Internal server error',
    status: 500
  },
  ServiceUnavailable: {
    error: 'Service unavailable',
    status: 503
  },
  Success: {
    error: '',
    status: 200
  },

  onlyAdmin: extend({}, this.Forbidden, {
    message: 'Only admin are allowed to do this!'
  }),

  noPermission: extend(
    {},
    {
      error: 'Permission denied',
      status: 403,
      message: 'You do not have permission to consume this resource!'
    }
  ),
  invalidId: extend({}, this.BadRequest, {
    message: 'Invalid Id parameter'
  }),
  invalidSearchTerm: extend({}, this.BadRequest, {
    message: 'Invalid search term'
  }),
  missingAttr(attrs) {
    return extend({}, this.BadRequest, {
      message: `Attribute(s) (${attrs.join(',')}) seem(s) to be missing`
    })
  },
  unwantedAttr(attrs) {
    return extend({}, this.BadRequest, {
      message: `Attribute(s) (${attrs.join(',')}) can't be updated`
    })
  },
  uniqueAttr(attrs) {
    return extend({}, this.BadRequest, {
      message: `Attribute(s) [${attrs.join(',')}] must be unique`
    })
  },
  custom(msg) {
    return extend({}, this.BadRequest, {
      message: msg
    })
  },

  // REST API ERRORS

  addFailure() {
    return extend({}, this.BadRequest, {
      message: 'Item WAS NOT added'
    })
  },
  updateFailure() {
    return extend({}, this.BadRequest, {
      message: 'Item WAS NOT updated'
    })
  },
  deleteFailure() {
    return extend({}, this.BadRequest, {
      message: 'Item WAS NOT deleted'
    })
  },

  addSuccess() {
    return extend({}, this.Success, {
      message: 'Item added successfully'
    })
  },
  updateSuccess() {
    return extend({}, this.Success, {
      message: 'Item updated successfully'
    })
  },
  deleteSuccess() {
    return extend({}, this.Success, {
      message: 'Item deleted successfully'
    })
  },

  empty: []
}
