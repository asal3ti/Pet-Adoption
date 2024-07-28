require("dotenv").config();
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const Pet = require("../models/Pet");

const db = process.env.MONGO_URI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

const filePath =
  "/Users/alejandrosilva/Documents/projects/Pet-Adoption/server/Adoptable_Pets.csv"; // Corrected file path
const pets = [];

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    pets.push({
      animalId: row["Animal ID"],
      intakeType: row["Intake Type"],
      inDate: new Date(row["In Date"]),
      petName: row["Pet name"],
      animalType: row["Animal Type"],
      petAge: row["Pet Age"],
      petSize: row["Pet Size"],
      color: row["Color"],
      breed: row["Breed"],
      sex: row["Sex"],
      url: row["URL Link "],
      crossing: row["Crossing"] === "YES" ? true : false,
    });
  })
  .on("end", () => {
    Pet.insertMany(pets)
      .then(() => {
        console.log("Data Loaded");
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  })
  .on("error", (err) => {
    console.error("Error reading the file:", err);
    process.exit(1);
  });
