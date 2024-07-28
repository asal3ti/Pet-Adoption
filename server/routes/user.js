const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Pet = require("../models/Pet");

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

// POST api/user/favorite/:animalId - Add to favorites
router.post("/favorite/:animalId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pet = await Pet.findById(req.params.animalId);

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    user.favorites.push(pet);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PATCH api/user/favorite/:animalId - Remove from favorites
router.patch("/favorite/:animalId", auth, async (req, res) => {
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
});

// DELETE api/user/:userId - Delete user account
router.delete("/:userId", auth, async (req, res) => {
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
});

// PUT api/user/:userId - Update user account
router.put("/:userId", auth, async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const updatedUser = { firstName, lastName, email, phone };

  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.user.role !== "admin" && req.user.id !== req.params.userId) {
      return res.status(403).json({ msg: "Access denied" });
    }

    user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updatedUser },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
