const mongoose = require('mongoose')

const connect = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ta')
    console.log('DB: ', conn.connection.name, '\nHOST: ', conn.connection.host)
  } catch (err) {
    console.log('Error Connecting DB')
    process.exit(1)
  }
}

module.exports = connect
