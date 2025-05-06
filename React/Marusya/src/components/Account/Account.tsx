import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./Account.module.scss";
import { Button } from "../Button/Button";
import { AuthForm } from "../AuthForm";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { authFormVisible } from "../../store/authFormVisibleSlice";
import { IAuthFormVisibleStoreProps } from "./types";
import { useProfile } from "../../hooks/useProfile";
import IconUser from "../../assets/images/icon-user.svg?react";

export const Account = () => {
  const authFormVisibleValue = useSelector(
    (state: IAuthFormVisibleStoreProps) => state.authFormVisible.authFormVisible
  );
  const dispatch = useDispatch();

  const { data, isError, isLoading, isSuccess } = useProfile();

  const handleLogin = () => {
    dispatch(authFormVisible({ authFormVisible: true }));
  };

  useEffect(() => {
    if (authFormVisibleValue === true) {
      document.body.classList.add("no-scroll");
    } else {
      if (document.body.classList.contains("no-scroll")) {
        document.body.classList.remove("no-scroll");
      }
    }
  }, [authFormVisibleValue]);

  if (isLoading) {
    return <ClipLoader color="#dc5dfc" size={32} />;
  }

  if (isSuccess) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {/* Laptop */}

          <NavLink
            className={({ isActive }) =>
              `${styles.account__link} ${
                isActive ? styles.account__linkActive : ""
              }`
            }
            to="/profile"
          >
            {data?.surname}
          </NavLink>

          {/* Mobile */}

          <NavLink className={styles.account__linkMobile} to="/profile">
            <IconUser className={styles.account__linkMobileIcon} />
          </NavLink>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isError) {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className={styles.account__btn}>
              <Button
                title="Войти"
                type="button"
                variant="link"
                onClick={handleLogin}
              />
            </div>
            <div className={styles.account__btnMobile}>
              <Button
                title={<IconUser className={styles.account__linkMobileIcon} />}
                size="small"
                onClick={handleLogin}
              />
            </div>
            <AuthForm />
          </motion.div>
        </AnimatePresence>
      </>
    );
  }
};

export default Account;
