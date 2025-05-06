import { FC } from "react";
import { Button } from "../Button/Button";
import styles from "./SuccessForm.module.scss";
import { useDispatch } from "react-redux";
import { resetAuthType } from "../../store/authTypeSlice";

export const SuccessForm: FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(resetAuthType());
  };

  return (
    <div className={styles.successForm}>
      <span className={styles.successForm__text}>Регистрация завершена</span>
      <span className={styles.successForm__description}>
        Используйте вашу электронную почту для входа
      </span>
      <Button
        type="button"
        variant="primary"
        title="Войти"
        size="medium"
        onClick={handleLogin}
      />
    </div>
  );
};

export default SuccessForm;
