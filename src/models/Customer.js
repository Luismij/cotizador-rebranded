const { Schema, model } = require('mongoose')

const CustomerSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  webAddress: {
    type: String,
  },
  logo: {
    type: String,
  },
  nit: {
    type: Number,
  },
  address: {
    type: String,
  },
  businessName: {
    type: String,
  },
  phone: {
    type: Number,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Customer", CustomerSchema);
