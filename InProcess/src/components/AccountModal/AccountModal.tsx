import { Link } from "react-router";
import { useUser } from "../../hooks/useUser";
import { Button } from "../Button";
import styles from "./AccountModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAccountModalValue } from "../../store/accountModalSlice";
import { AccountModalObjectProps } from "../../store/types";
import { useEffect, useRef } from "react";

export const AccountModal = () => {
  const { exitUser } = useUser();
  const dispatch = useDispatch();
  const accountModalValue = useSelector(
    (state: AccountModalObjectProps) => state.accountModalName.accountModalValue
  );
  const modalRef = useRef<HTMLDivElement>(null);

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
  };

  const handleModalView = () => {
    dispatch(setAccountModalValue({ accountModalValue: !accountModalValue }));
  };

  return (
    <div className={styles.accountModal} ref={modalRef}>
      <Link
        className={styles.accountModal__link}
        to="/api/user"
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
  );
};

export default AccountModal;
