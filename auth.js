0const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashed);
    res.status(201).json({ message: "Registered successfully" });
  } catch {
    res.status(400).json({ message: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  req.session.user = { id: user.id, username: user.username };
  res.json({ message: "Login successful" });
});

router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
  res.json(req.session.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;
