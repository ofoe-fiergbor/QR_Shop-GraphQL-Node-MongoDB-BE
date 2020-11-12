const jwt = require('jsonwebtoken')
const {SECRETKEY} = require('../config')

const generateToken = (res) => {
    return jwt.sign(
      {
        id: res.id,
        email: res.email,
        username: res.username,
      },
      SECRETKEY,
      { expiresIn: "1h" }
    );
  };


  module.exports = generateToken