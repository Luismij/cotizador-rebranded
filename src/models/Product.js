const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  id:{
    type: Number,
  },
  internalComment: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
  },
  photo: {
    type: String,
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
