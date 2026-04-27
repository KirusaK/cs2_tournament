

CREATE TABLE Teams (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE Players (
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(50) NOT NULL,
	team_id INT REFERENCES Teams(id)
);

CREATE TABLE Matches (
	id SERIAL PRIMARY KEY,
	team_a_id INT REFERENCES Teams(id),
	team_b_id INT REFERENCES Teams(id),
	score_a INT DEFAULT 0,
	score_b INT DEFAULT 0,
	match_date TIMESTAMP,
	status VARCHAR(20) DEFAULT 'SCHEDULED',
	winner_id INT REFERENCES Teams(id),
	next_match_id INT REFERENCES Matches(id)
);



SELECT p.nickname, p.country, t.name AS team_name FROM Players p JOIN Teams t ON p.team_id = t.id;

SELECT * FROM Te;

ALTER TABLE Players DROP COLUMN country;

ALTER TABLE Players DROP CONSTRAINT IF EXISTS players_team_id_fkey;

ALTER TABLE Players ADD CONSTRAINT players_team_id_fkey FOREIGN KEY (team_id) REFERENCES Teams(id) ON DELETE CASCADE;