const Database = require("better-sqlite3");
const db = new Database("ecommerce.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL
  )
`).run();

const count = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;
if (count === 0) {
  const insert = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  insert.run("T-Shirt", 20);
  insert.run("Jeans", 40);
  insert.run("Shoes", 60);
}

module.exports = db;
