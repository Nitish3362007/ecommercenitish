const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const authRoutes = require("./auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "supersecretkey123",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRoutes);

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
