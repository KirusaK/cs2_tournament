import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./TeamsModalForm.module.scss";

export const AddTeamsForm = (props) => {
  const [teamName, setTeamName] = useState("");

  const { onClose, onTeamAdded } = props;

  const handleAddTeam = async () => {
    const url = "http://localhost:5000/api/teams";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName }),
      });
      if (response.ok) {
        console.log("Team saved!");
        setTeamName("");

        if (onTeamAdded) onTeamAdded();

        onClose();
      } else {
        console.log("Server error!");
      }
    } catch (err) {
      console.error("Network error:", err);
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
        <Modal.Title>Add Team</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#1e2946", color: "white" }}>
        <Form>
          <Form.Label>Team name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter team name..."
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#1e2946",
          borderTop: "none",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleAddTeam} className={styles.AddTeamsForm__button}>
          ADD TEAM
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
