const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  animalId: { type: String, required: true, unique: true },
  intakeType: { type: String, required: true },
  inDate: { type: Date, required: true },
  petName: { type: String, required: true },
  animalType: { type: String, required: true },
  petAge: { type: String, required: true },
  petSize: { type: String, required: true },
  color: { type: String, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  url: { type: String, required: true },
  crossing: { type: Boolean, default: false },
});

module.exports = mongoose.model("Pet", PetSchema);
