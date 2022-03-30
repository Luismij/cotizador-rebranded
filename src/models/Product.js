const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  /* userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }, */
  sku: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  resume: {
    type: String,
  },
  keywords: {
    type: String,
  },
  description: {
    type: String,
  },
  prices: [
    {
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  photo: {
    type: String
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
