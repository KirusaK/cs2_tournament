CREATE TABLE Teams (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	tag VARCHAR(10) UNIQUE
);

CREATE TABLE Players (
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
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

INSERT INTO TEAMS (name, tag) VALUES ('NAVI', 'NAVI');
INSERT INTO Players (nickname, country, team_id) VALUES ('Niko', 'Bosnia', 1);

SELECT p.nickname, p.country, t.name AS team_name FROM Players p JOIN Teams t ON p.team_id = t.id;


