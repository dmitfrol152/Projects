import { FC } from "react";
import { Button } from "../Button/Button";
import styles from "./ErrorAuthForm.module.scss";
import { useDispatch } from "react-redux";
import { resetAuthType } from "../../store/authTypeSlice";

export const ErrorAuthForm: FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(resetAuthType());
  };

  return (
    <div className={styles.errorAuthForm}>
      <span className={styles.errorAuthForm__text}>Ошибка авторизации</span>
      <span className={styles.errorAuthForm__description}>
        Пользователя с такими данными не существует!
      </span>
      <Button
        type="button"
        variant="primary"
        title="Повторить"
        size="medium"
        onClick={handleLogin}
      />
    </div>
  );
};

export default ErrorAuthForm;
