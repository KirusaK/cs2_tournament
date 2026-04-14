import { useState } from "react";
import styles from "../ModalForm.module.scss";

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
    <div className={styles.overlay}>
      <div className={styles.AddPlayerForm}>
        <div className={styles.AddPlayerForm__Wrapper}>
          <div className={styles.AddPlayerForm__Header}>
            <h1 className={styles.AddPlayerForm__Title}>Add Team</h1>
            <svg
              width={24}
              height={24}
              className={styles.AddPlayerForm__Close}
              onClick={onClose}
            >
              <use href="/assets/icons/symbol-defs.svg#icon-cross"></use>
            </svg>
          </div>
          <hr />
          <div className={styles.AddPlayerForm__Input}>
            <div className={styles.AddPlayerForm__InputWrapper}>
              <label className={styles.AddPlayerForm__Label}>Team name</label>
              <input
                type="text"
                placeholder="Enter team name..."
                className={styles.AddPlayerForm__InputField}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.AddPlayerForm__ButtonWrapper}>
            <button
              className={styles.AddPlayerForm__Button}
              onClick={handleAddTeam}
            >
              ADD TEAM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
