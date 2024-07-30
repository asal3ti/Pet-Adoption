const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Pet = require("../models/Pet");

// POST api/pets - Add a new pet (Admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const {
    animalId,
    intakeType,
    inDate,
    petName,
    animalType,
    petAge,
    petSize,
    color,
    breed,
    sex,
    url,
    crossing,
  } = req.body;

  try {
    const newPet = new Pet({
      animalId,
      intakeType,
      inDate,
      petName,
      animalType,
      petAge,
      petSize,
      color,
      breed,
      sex,
      url,
      crossing,
    });

    const pet = await newPet.save();
    res.json(pet);
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({
        msg: `Duplicate key error: Pet with animalId ${err.keyValue.animalId} already exists.`,
      });
    } else {
      res.status(500).send("Server error");
    }
  }
});

// GET api/pets - Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET api/pets/:animalId - Get a pet by ID
router.get("/:animalId", async (req, res) => {
  try {
    const pet = await Pet.findOne({ animalId: req.params.animalId });
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT api/pets/:animalId - Update a pet (Admin only)
router.put("/:animalId", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  const {
    intakeType,
    inDate,
    petName,
    animalType,
    petAge,
    petSize,
    color,
    breed,
    sex,
    url,
    crossing,
  } = req.body;

  const updatedPet = {
    intakeType,
    inDate,
    petName,
    animalType,
    petAge,
    petSize,
    color,
    breed,
    sex,
    url,
    crossing,
  };

  try {
    let pet = await Pet.findOne({ animalId: req.params.animalId });

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    pet = await Pet.findOneAndUpdate(
      { animalId: req.params.animalId },
      { $set: updatedPet },
      { new: true }
    );
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE api/pets/:animalId - Remove a pet from the database (Admin only)
router.delete("/:animalId", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    let pet = await Pet.findOne({ animalId: req.params.animalId });

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    await Pet.findOneAndDelete({ animalId: req.params.animalId });
    res.json({ msg: "Pet removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
