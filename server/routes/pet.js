const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const Pet = require("../models/Pet");

// POST api/pets - Add a new pet (Admin only)
router.post(
  "/",
  auth,
  [
    body("animalId").notEmpty().withMessage("Animal ID is required"),
    body("intakeType").notEmpty().withMessage("Intake type is required"),
    body("inDate").isISO8601().withMessage("Invalid date format"),
    body("petName").notEmpty().withMessage("Pet name is required"),
    body("animalType").notEmpty().withMessage("Animal type is required"),
    body("petAge").isNumeric().withMessage("Pet age must be a number"),
    body("petSize").notEmpty().withMessage("Pet size is required"),
    body("color").notEmpty().withMessage("Color is required"),
    body("breed").notEmpty().withMessage("Breed is required"),
    body("sex")
      .isIn(["male", "female", "unknown"])
      .withMessage("Sex must be 'male', 'female', or 'unknown'"),
    body("url").optional().isURL().withMessage("Invalid URL format"),
    body("crossing")
      .optional()
      .isBoolean()
      .withMessage("Crossing must be a boolean value"),
  ],
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  }
);

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
router.get(
  "/:animalId",
  [
    param("animalId")
      .notEmpty()
      .withMessage("Animal ID is required")
      .isString()
      .withMessage("Animal ID must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

// PUT api/pets/:animalId - Update a pet (Admin only)
router.put(
  "/:animalId",
  auth,
  [
    param("animalId")
      .notEmpty()
      .withMessage("Animal ID is required")
      .isString()
      .withMessage("Animal ID must be a string"),
    body("intakeType")
      .optional()
      .notEmpty()
      .withMessage("Intake type is required"),
    body("inDate").optional().isISO8601().withMessage("Invalid date format"),
    body("petName").optional().notEmpty().withMessage("Pet name is required"),
    body("animalType")
      .optional()
      .notEmpty()
      .withMessage("Animal type is required"),
    body("petAge")
      .optional()
      .isNumeric()
      .withMessage("Pet age must be a number"),
    body("petSize").optional().notEmpty().withMessage("Pet size is required"),
    body("color").optional().notEmpty().withMessage("Color is required"),
    body("breed").optional().notEmpty().withMessage("Breed is required"),
    body("sex")
      .optional()
      .isIn(["male", "female", "unknown"])
      .withMessage("Sex must be 'male', 'female', or 'unknown'"),
    body("url").optional().isURL().withMessage("Invalid URL format"),
    body("crossing")
      .optional()
      .isBoolean()
      .withMessage("Crossing must be a boolean value"),
  ],
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  }
);

// DELETE api/pets/:animalId - Remove a pet from the database (Admin only)
router.delete(
  "/:animalId",
  auth,
  [
    param("animalId")
      .notEmpty()
      .withMessage("Animal ID is required")
      .isString()
      .withMessage("Animal ID must be a string"),
  ],
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  }
);

module.exports = router;
