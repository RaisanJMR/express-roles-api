const roles = require('./middleware/roles')
const User = require('./UserModal')
const express = require('express')
const ROLES = require('./roleList')
const data = require('./data/data')
const connect = require('./connect')
const cors = require('cors')
const Ta = require('./TaModal')
const app = express()

connect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// POST
app.post('/user', async (req, res) => {
  const { name, age } = req.body
  const user = await User.create({
    name,
    age,
  })
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      age: user.age,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// POST
app.post('/ta', async (req, res) => {
  const {
    employeeId,
    status,
    roster,
    actual,
    reason,
    confirmed,
    is_clocked_in,
    total_work_hours,
  } = req.body
  const ta = await Ta.create({
    employeeId,
    status: {
      in: status.in,
    },
    roster: {
      in_date: roster.in_date,
      out_date: roster.out_date,
      in_time: roster.in_time,
      out_time: roster.out_time,
    },
    actual: {
      in_date: actual.in_date,
      in_time: actual.in_time,
      out_date: actual.out_date,
      out_time: actual.out_time,
    },
    reason: {
      in: reason.in,
      out: reason.out,
    },
    // confirmed: {
    //   in_date: confirmed.in_date,
    //   out_date: confirmed.out_date,
    //   in_time: confirmed.in_time,
    //   out_time: confirmed.out_time,
    // },
    is_clocked_in: is_clocked_in,
    total_work_hours: total_work_hours,
  })
  if (ta) {
    console.log(ta)
    res.status(201).json(ta)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

app.patch('/ta', async (req, res) => {
  const {
    employeeId,
    status,
    roster,
    actual,
    reason,
    confirmed,
    is_clocked_in,
    total_work_hours,
  } = req.body
  const ta = await Ta.findOne({ employeeId: employeeId })

  if (ta) {
    const setFields = {
      'status.out': status.out,
      'reason.out': reason.out,
      'confirmed.out_date': new Date(),
      'confirmed.in_date': new Date(),
      'confirmed.in_time': confirmed.in_time,
      'confirmed.out_time': confirmed.out_time,
    }
    const updatedTa = await Ta.findByIdAndUpdate(
      { _id: ta._id },
      {
        $set: setFields,
      },
      { new: true }
    )
    if (updatedTa) {
      res.status(201).json(updatedTa)
    } else {
      console.log('cannot update ta')
    }
  }
})

// GET
app.get('/user', async (req, res) => {
  const user = await User.find({})
  if (user) {
    res.status(201).json(user)
  } else {
    res.status(400)
    throw new Error('Not Found')
  }
})

app.listen(5000)
