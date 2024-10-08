require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());

// Middleware
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/pets", require("./routes/pet"));
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
