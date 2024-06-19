const RequestHandler = require('./RequestHandler')
const Logger = require('./logger')
const jwt = require('jsonwebtoken')
const logger = new Logger()
const requestHandler = new RequestHandler(logger)
function getTokenFromCookie(req) {
  if (req.cookies && req.cookies.accessToken) {
    // Trả về Access Token từ cookie
    return req.cookies.accessToken
  }

  return null
}

function verifyToken(req, res, next) {
  try {
    if (!_.has(req.cookies, 'accessToken')) {
      requestHandler.throwError(
        401,
        'Unauthorized',
        'Not authorized to access this resource!'
      )()
    }

    const token = getTokenFromCookie(req)
    if (!token) {
      requestHandler.throwError(
        401,
        'Unauthorized',
        'Not authorized to access this resource!'
      )()
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        requestHandler.throwError(401, 'Unauthorized', err.name)()
      }

      req.user = decoded
      next()
    })
    if (!decoded) {
      requestHandler.throwError(
        401,
        'Unauthorized',
        'Not authorized to access this resource!'
      )()
    }
  } catch (err) {
    requestHandler.sendError(req, res, err)
  }
}

module.exports = {
  getTokenFromCookie,
  verifyToken
}
