const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/teams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Teams ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error receiving commands" });
  }
});

app.listen(PORT, () => {
  console.log(`The server took off on the port ${PORT}`);
});
