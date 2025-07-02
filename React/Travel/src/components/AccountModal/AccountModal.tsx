import { Link, useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { Button } from "../Button";
import styles from "./AccountModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAccountModalValue } from "../../store/accountModalSlice";
import { AccountModalObjectProps } from "../../store/types";
import { useEffect, useRef } from "react";
import { setEditFormValue } from "../../store/editFormSlice";
import { AnimatePresence, motion } from "motion/react";

export const AccountModal = () => {
  const { exitUser } = useUser();
  const dispatch = useDispatch();
  const accountModalValue = useSelector(
    (state: AccountModalObjectProps) => state.accountModalName.accountModalValue
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(setAccountModalValue({ accountModalValue: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleExitUser = () => {
    exitUser.mutate();
    dispatch(setAccountModalValue({ accountModalValue: !accountModalValue }));
    navigate("/");
  };

  const handleModalView = () => {
    dispatch(setEditFormValue({ editFormValue: false }));
    dispatch(setAccountModalValue({ accountModalValue: !accountModalValue }));
  };

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
        <div className={styles.accountModal} ref={modalRef}>
          <Link
            className={styles.accountModal__link}
            to="/profile"
            onClick={handleModalView}
          >
            Профиль
          </Link>
          <Button
            title="Выход"
            type="button"
            variant="linkBlack"
            size="none"
            onClick={handleExitUser}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountModal;
