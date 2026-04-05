import styles from "../ModalForm.module.scss";

export const AddTeamsForm = (props) => {
  const { onClose } = props;

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
              />
            </div>
          </div>
          <div className={styles.AddPlayerForm__ButtonWrapper}>
            <button className={styles.AddPlayerForm__Button}>ADD TEAM</button>
          </div>
        </div>
      </div>
    </div>
  );
};
