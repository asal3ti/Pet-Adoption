const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Pet = require("../models/Pet");
const bcrypt = require("bcryptjs");

// GET api/user - Get all users (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET api/user/me - Get my account
router.get("/me", auth, async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST api/user/favorite/:animalId - Add to favorites
router.post(
  "/favorite/:animalId",
  auth,
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
      const user = await User.findById(req.user.id);
      const pet = await Pet.findOne({ animalId: req.params.animalId });

      if (!pet) {
        return res.status(404).json({ msg: "Pet not found" });
      }

      if (user.favorites.indexOf(pet.animalId) === -1)
        user.favorites.push(pet.animalId);
      await user.save();
      res.json(user.favorites);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// PATCH api/user/favorite/:animalId - Remove from favorites
router.patch(
  "/favorite/:animalId",
  auth,
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
      const user = await User.findById(req.user.id);
      user.favorites = user.favorites.filter(
        (fav) => fav.toString() !== req.params.animalId
      );
      await user.save();
      res.json(user.favorites);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// DELETE api/user/:userId - Delete user account
router.delete(
  "/:userId",
  auth,
  [
    param("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid User ID format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
        return res.status(403).json({ msg: "Access denied" });
      }

      await User.findByIdAndDelete(req.params.userId);
      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// PUT api/user - Update user account
router.put(
  "/",
  auth,
  [
    body("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("lastName")
      .optional()
      .notEmpty()
      .withMessage("Last name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("phone")
      .optional()
      .matches(/^\d{10}$/)
      .withMessage("Invalid phone number. It should be 10 digits"),
    body("userId").optional().isMongoId().withMessage("Invalid User ID format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, userId } = req.body;

    const updatedUser = { firstName, lastName, email, phone };

    try {
      // The authenticated user's ID is available in req.user.id
      const userIdToUpdate =
        req.user.role === "admin" && userId ? userId : req.user.id;

      // Find the user by ID
      let user = await User.findById(userIdToUpdate);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update the user
      user = await User.findByIdAndUpdate(
        user._id,
        { $set: updatedUser },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// PUT api/user/password - Change password
router.put(
  "/password",
  auth,
  [
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters long")
      .matches(/(?=.*[A-Z])/)
      .withMessage("New password must include at least one uppercase letter")
      .matches(/(?=.*[a-z])/)
      .withMessage("New password must include at least one lowercase letter")
      .matches(/(?=.*\d)/)
      .withMessage("New password must include at least one number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      res.json({ msg: "Password updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
