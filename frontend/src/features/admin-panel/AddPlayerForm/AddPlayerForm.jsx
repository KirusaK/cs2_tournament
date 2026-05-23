import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./PlaterModalForm.module.scss";

export const AddPlayerForm = (props) => {
  // Получаем пропсы: onClose - функция для закрытия модального окна, onPlayerAdded - функция для обновления списка игроков после добавления, teams - массив существующих команд
  const { onClose, onPlayerAdded, teams } = props;

  // Локальное состояние для хранения введенных данных
  const [nickname, setNickname] = useState("");
  const [teamName, setTeamName] = useState("");

  // Функция для обработки добавления игрока
  const handleAddPlayer = async () => {
    const selectedTeam = teams.find(
      (team) =>
        team.name.trim().toLowerCase() === teamName.trim().toLowerCase(),
    );

    if (selectedTeam && parseInt(selectedTeam.player_count) >= 5) {
      alert(`Error: Ta drużyna (${selectedTeam.name}) jest już pełna (5/5)!`);
      return; // Прерываем функцию, запрос на бэкенд не уйдет
    }

    const url = "http://localhost:5000/api/players";

    try {
      const respons = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, teamName }),
      });
      const data = await respons.json();

      if (respons.ok) {
        alert("Success: " + data.message);
        setNickname("");
        setTeamName("");

        if (onPlayerAdded) onPlayerAdded();
        onClose();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network error!");
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdropClassName={styles.myBlurBackdrop}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#1e2946",
          color: "white",
          borderBottom: "1.6px solid #D9D9D9",
        }}
      >
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#1e2946", color: "white" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter nickname..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ backgroundColor: "white", color: "black" }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter team..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{ backgroundColor: "white", color: "black" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#1e2946",
          borderTop: "none",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleAddPlayer}
          className={styles.AddPlayerForm__button}
        >
          ADD PLAYER
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
