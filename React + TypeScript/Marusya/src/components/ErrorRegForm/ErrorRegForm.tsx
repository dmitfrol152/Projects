import { FC } from "react";
import { Button } from "../Button/Button";
import styles from "./ErrorRegForm.module.scss";
import { useDispatch } from "react-redux";
import { setRegType } from "../../store/authTypeSlice";

export const ErrorRegForm: FC = () => {
  const dispatch = useDispatch();

  const handleReg = () => {
    dispatch(setRegType());
  };

  return (
    <div className={styles.errorRegForm}>
      <span className={styles.errorRegForm__text}>Ошибка регистрации</span>

      <span className={styles.errorRegForm__description}>
        Пользователь с такими данными уже существует!
      </span>
      <Button
        type="button"
        variant="primary"
        title="Повторить"
        size="medium"
        onClick={handleReg}
      />
    </div>
  );
};

export default ErrorRegForm;
