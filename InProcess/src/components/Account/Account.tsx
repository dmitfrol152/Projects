import { useUser } from "../../hooks/useUser";
import { setLoginType } from "../../store/authTypeSlice";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Account.module.scss";
import IconArrowTop from "../../assets/images/svg/icon-arrow-top.svg?react";
import IconArrowDown from "../../assets/images/svg/icon-arrow-bottom.svg?react";
import { AccountModalObjectProps } from "../../store/types";
import { setAccountModalValue } from "../../store/accountModalSlice";
import { AccountModal } from "../AccountModal";

export const Account = () => {
  const accountModalValue = useSelector(
    (state: AccountModalObjectProps) => state.accountModalName.accountModalValue
  );
  const { getUser } = useUser();
  const dispatch = useDispatch();
  const handleAuthForm = () => {
    dispatch(setLoginType());
  };

  const handleModalView = () => {
    dispatch(setAccountModalValue({ accountModalValue: !accountModalValue }));
  };

  // isSuccess
  if (getUser.isSuccess) {
    return (
      <div className={styles.account}>
        {/* {getUser.data.photo ? (
          <img
            className={styles.account__logo}
            src={getUser.data.photo}
            alt="Фотография пользователя"
          />
        ) : null} */}
        <span className={styles.account__name}>
          {getUser.data.full_name ? getUser.data.full_name : "Пользователь"}
        </span>
        <Button
          title={
            accountModalValue === true ? (
              <IconArrowTop className={styles.account__svg} />
            ) : (
              <IconArrowDown className={styles.account__svg} />
            )
          }
          type="button"
          variant="svg"
          size="none"
          onClick={handleModalView}
        />
        {accountModalValue && <AccountModal />}
      </div>
    );
  }

  // isError
  if (getUser.isError) {
    return (
      <Button
        title="Войти"
        type="button"
        variant="link"
        size="none"
        onClick={handleAuthForm}
      />
    );
  }
};
export default Account;
