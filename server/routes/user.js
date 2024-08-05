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

// Get api/user/me Get my account
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
router.post("/favorite/:animalId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pet = await Pet.findOne({ animalId: req.params.animalId });

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    user.favorites.push(pet.animalId);
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

// PUT api/user - Update user account
router.put("/", auth, async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  const updatedUser = { firstName, lastName, email, phone };

  try {
    // The authenticated user's ID is available in req.user.id
    const userId = req.user.id;

    // Find the user by ID
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If the user is an admin, allow updates for any user by passing a userId in the request body
    if (req.user.role === "admin" && req.body.userId) {
      user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
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
});

module.exports = router;
