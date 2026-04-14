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

app.post("/api/teams", async (req, res) => {
  try {
    const { name } = req.body;
    const newTeam = await pool.query(
      "INSERT INTO Teams (name) VALUES ($1) RETURNING *",
      [name],
    );
    res.json(newTeam.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd podczas dodawania zespołu" });
  }
});

app.delete("/api/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTeam = await pool.query("DELETE FROM Teams WHERE id = $1", [
      id,
    ]);

    if (deleteTeam.rowCount === 0) {
      return res.status(404).json({ message: "Nie znaleziono zespołu" });
    }

    res.json({ message: "Zespół został pomyślnie usunięty!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err: "Błąd serwera podczas usuwania" });
  }
});

app.listen(PORT, () => {
  console.log(`The server took off on the port ${PORT}`);
});
