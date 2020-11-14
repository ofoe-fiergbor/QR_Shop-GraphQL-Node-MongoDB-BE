const { model, Schema } = require("mongoose");

const merchantSchema = new Schema({
  username: String,
  createdAt: String,
  name: String,
  email: String,
  address: String,
  items: [
    {
      username: String,
      email: String,
      itemName: String,
      price: String,
      createdAt: String,
    },
  ],
  likes: [{ username: String, createdAt: String, email: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Merchant", merchantSchema);
