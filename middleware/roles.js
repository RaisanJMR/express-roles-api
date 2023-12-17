const ROLES = require('../roleList')

const roles = (role) => (req, res, next) => {
  const isAllowed = role.some((r) => ROLES.includes(r))
  if (!isAllowed) {
    return res.status(403).json({
      message: 'you dont have acccess to these resource',
      success: false,
    })
  }
  next()
}

module.exports = roles
