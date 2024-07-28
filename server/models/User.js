const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  emailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
