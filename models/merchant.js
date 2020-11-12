const { model, Schema } = require("mongoose");

const merchantSchema = new Schema({
  username: String,
  createdAt: String,
  contact: String,
  address: String,
  products: [
    {
      username: String,
      name: String,
      price: String,
    },
  ],
  likes: [{ username: String, createdAt: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model('Merchant', merchantSchema)
