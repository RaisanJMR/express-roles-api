const mongoose = require('mongoose')

const TaSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    status: {
      in: { type: String, default: '', required: false },
      out: { type: String, default: '', required: false },
    },
    roster: {
      in_date: { type: Date, required: false },
      out_date: { type: Date, default: new Date(0), required: false },
      in_time: { type: String, required: false },
      out_time: { type: String, default: '', required: false },
    },
    actual: {
      in_date: { type: Date, default: new Date(), required: false },
      out_date: { type: Date, default: new Date(), required: false },
      in_time: { type: String, default: '', required: false },
      out_time: { type: String, default: '', required: false },
    },
    reason: {
      in: { type: String, default: '', required: false },
      out: { type: String, default: '', required: false },
    },
    confirmed: {
      in_date: { type: Date, default: new Date(0), required: false },
      out_date: { type: Date, default: new Date(0), required: false },
      in_time: { type: String, default: '', required: false },
      out_time: { type: String, default: '', required: false },
    },
    is_clocked_in: { type: Boolean, required: true, default: false },
    total_work_hrs: { type: String, default: '', required: false },
  },
  { timestamps: true }
)

const Ta = mongoose.model('Ta', TaSchema)

module.exports = Ta
