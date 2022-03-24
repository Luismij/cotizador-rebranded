const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
  },
  discount: {
    outOfRangeDiscount: {
      type: Number,
      required: true,
    },
    ranges: [
      {
        min: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        },
        discount: {
          type: Number,
          required: true
        }
      }
    ]
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", UserSchema);
