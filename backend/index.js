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
    const result = await pool.query(`
      SELECT t.*, COUNT(p.id) AS player_count 
      FROM Teams t 
      LEFT JOIN Players p ON t.id = p.team_id 
      GROUP BY t.id 
      ORDER BY t.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd podczas pobierania zespołów" });
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

app.post("/api/players", async (req, res) => {
  try {
    const { nickname, teamName } = req.body;

    // 1. Ищем команду по имени и сразу считаем в ней игроков
    const teamCheck = await pool.query(
      `SELECT t.id, COUNT(p.id) AS player_count 
       FROM Teams t 
       LEFT JOIN Players p ON t.id = p.team_id 
       WHERE t.name = $1 
       GROUP BY t.id`,
      [teamName],
    );

    // 2. Проверяем, существует ли команда
    if (teamCheck.rows.length === 0) {
      return res.status(404).json({ error: "Ta drużyna nie istnieje!" });
    }

    const team = teamCheck.rows[0];

    // 3. Проверяем, есть ли место (лимит 5)
    if (parseInt(team.player_count) >= 5) {
      return res
        .status(400)
        .json({ error: "Ta drużyna jest już pełna (5/5)!" });
    }

    // 4. Если всё ок — добавляем игрока
    const newPlayer = await pool.query(
      "INSERT INTO Players (nickname, team_id) VALUES ($1, $2) RETURNING *",
      [nickname, team.id],
    );

    res.json({ message: "Gracz dodany pomyślnie!", player: newPlayer.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.get("/api/players", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.nickname, t.name AS "teamName" FROM Players p LEFT JOIN Teams t ON p.team_id = t.id ORDER BY p.id ASC`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Błąd podczas pobierania graczy" });
  }
});

app.listen(PORT, () => {
  console.log(`The server took off on the port ${PORT}`);
});
