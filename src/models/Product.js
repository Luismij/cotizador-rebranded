const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  id: {
    type: Number,
  },
  internalComment: {
    type: String,
  },
  sku: {
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
  },
  categoryId: {
    type: Number,
  },
  description: {
    type: String,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Product", ProductSchema);
