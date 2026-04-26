import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./PlaterModalForm.module.scss";

export const AddPlayerForm = (props) => {
  const { onClose, onPlayerAdded } = props;

  const [nickname, setNickname] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleAddPlayer = async () => {
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
