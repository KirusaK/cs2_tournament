// import sprite from "../../../../public/assets/icons/symbol-defs.svg";
import styles from "./AddPlayerForm.module.scss";

export const AddPlayerForm = (props) => {
  const { onClose } = props;

  return (
    <div className={styles.overlay}>
      <div className={styles.AddPlayerForm}>
        <div className={styles.AddPlayerForm__Wrapper}>
          <div className={styles.AddPlayerForm__Header}>
            <h1 className={styles.AddPlayerForm__Title}>Add Player</h1>
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
              <label className={styles.AddPlayerForm__Label}>Nickname</label>
              <input
                type="text"
                placeholder="Enter nickname..."
                className={styles.AddPlayerForm__InputField}
              />
            </div>
            <div className={styles.AddPlayerForm__InputWrapper}>
              <label className={styles.AddPlayerForm__Label}>Team</label>
              <input
                type="text"
                placeholder="Enter team..."
                className={styles.AddPlayerForm__InputField}
              />
            </div>
          </div>
          <div className={styles.AddPlayerForm__ButtonWrapper}>
            <button className={styles.AddPlayerForm__Button}>ADD PLAYER</button>
          </div>
        </div>
      </div>
    </div>
  );
};
