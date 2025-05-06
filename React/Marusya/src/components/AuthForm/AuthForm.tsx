import styles from "./AuthForm.module.scss";
import { RegistrationForm } from "../RegistrationForm";
import { LoginForm } from "../LoginForm";
import { Button } from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import IconClose from "../../assets/images/icon-close.svg?react";
import { SuccessForm } from "../SuccessForm";
import { useDispatch, useSelector } from "react-redux";
import { IAuthFormVisibleStoreProps, IAuthTypeStoreProps } from "./types";
import { authFormVisible } from "../../store/authFormVisibleSlice";
import { setAuthType, resetAuthType } from "../../store/authTypeSlice";
import {
  emailValue,
  nameValue,
  surnameValue,
  passwordValue,
  confirmPasswordValue,
} from "../../store/registrationFormSlice";
import {
  emailValue as emailValueLog,
  passwordValue as passwordValueLog,
} from "../../store/loginFormSlice";
import { ErrorAuthForm } from "../ErrorAuthForm";
import { ErrorRegForm } from "../ErrorRegForm";
import logoWhite from "../../assets/images/logo/img-logo-white.png";
import logoWhite2x from "../../assets/images/logo/img-logo-white@2x.png";

export const AuthForm = () => {
  const authFormVisibleValue = useSelector(
    (state: IAuthFormVisibleStoreProps) => state.authFormVisible.authFormVisible
  );
  const authType = useSelector(
    (state: IAuthTypeStoreProps) => state.authType.authType
  );
  const dispatch = useDispatch();

  function resetFormReg() {
    dispatch(emailValue({ email: "" }));
    dispatch(nameValue({ name: "" }));
    dispatch(surnameValue({ surname: "" }));
    dispatch(passwordValue({ password: "" }));
    dispatch(confirmPasswordValue({ confirmPassword: "" }));
  }

  function resetFormLog() {
    dispatch(emailValueLog({ email: "" }));
    dispatch(passwordValueLog({ password: "" }));
  }

  const handleChangeForm = () => {
    dispatch(setAuthType());
    dispatch(authFormVisible({ authFormVisible: true }));
    setTimeout(() => {
      resetFormReg();
      resetFormLog();
    }, 300);
  };

  const handleCloseForm = () => {
    dispatch(authFormVisible({ authFormVisible: false }));
    dispatch(resetAuthType());
    setTimeout(() => {
      resetFormReg();
      resetFormLog();
    }, 300);
  };

  return (
    <div
      className={`${styles.authForm} ${
        authFormVisibleValue === true ? styles.visible : ""
      }`}
      onClick={() => {
        dispatch(authFormVisible({ authFormVisible: false }));
        dispatch(resetAuthType());
        setTimeout(() => {
          resetFormReg();
          resetFormLog();
        }, 300);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={authType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div
            className={styles.authForm__wrapper}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className={styles.authForm__img}
              src={logoWhite}
              srcSet={`${logoWhite2x} 2x`}
              alt="Логотип"
            />
            {authType === "login" ? (
              <LoginForm visible={authFormVisibleValue === true} />
            ) : authType === "registration" ? (
              <RegistrationForm />
            ) : authType === "success" ? (
              <SuccessForm />
            ) : authType === "error auth" ? (
              <ErrorAuthForm />
            ) : authType === "error reg" ? (
              <ErrorRegForm />
            ) : (
              <SuccessForm />
            )}
            {authType !== "success" &&
              authType !== "error auth" &&
              authType !== "error reg" && (
                <Button
                  title={
                    authType === "login" ? "Регистрация" : "У меня есть пароль"
                  }
                  type="button"
                  variant="login"
                  onClick={handleChangeForm}
                />
              )}
            <Button
              title={<IconClose className={styles.authForm__close} />}
              type="button"
              variant="close"
              onClick={handleCloseForm}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
