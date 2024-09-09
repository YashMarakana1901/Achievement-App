import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModal from "./models/Users.js";

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.post("/api/users", (req, res) => {
  UserModal.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get("/api", (req, res) => {
  UserModal.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params; // Get the id from params

  UserModal.findByIdAndUpdate(
    id, // Pass the id to find the user
    {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      role: req.body.role,
      address: req.body.address,
    },
    { new: true } // Return the updated document
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user); // Return the updated user
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  UserModal.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
});

// app.get("/", (req, res) => {
//   res.send("Server is Ready!");
// });

app.get("/api/me", (req, res) => {
  const me = [
    {
      email: "yash.radicalloop@gmail.com",
      password: 123456,
      first_name: "Yash P",
      last_name: "Marakana",
      phone: "9909286298",
      role: "admin",
    },
  ];
  res.send(me);
});

app.get("/api/admin-login", (req, res) => {
  const admin = [
    {
      username: "YashMarakana",
      email: "yash.radicalloop@gmail.com",
      password: "12345678",
      id: 1,
    },
  ];
  res.send(admin);
});

const port = 3000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
