import { useUser } from "../../hooks/useUser";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Account.module.scss";
import IconArrowTop from "../../assets/images/svg/icon-arrow-top.svg?react";
import IconArrowDown from "../../assets/images/svg/icon-arrow-bottom.svg?react";
import { AccountModalObjectProps } from "../../store/types";
import { setAccountModalValue } from "../../store/accountModalSlice";
import { AccountModal } from "../AccountModal";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

export const Account = () => {
  const accountModalValue = useSelector(
    (state: AccountModalObjectProps) => state.accountModalName.accountModalValue
  );
  const [, setSearchParams] = useSearchParams();
  const { getUser } = useUser();
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handleAuthForm = () => {
    setSearchParams({ auth: "login" });
  };

  const handleModalView = () => {
    dispatch(setAccountModalValue({ accountModalValue: !accountModalValue }));
  };

  // isSuccess
  if (getUser.isSuccess) {
    return (
      <div className={styles.account}>
        {getUser.data.photo ? (
          <div className={styles.account__load}>
            {isImageLoading && (
              <FadeLoader
                cssOverride={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: " scale(0.5) translate(-50%, -70%)",
                }}
                color="#ffa902"
              />
            )}
            <img
              className={styles.account__logo}
              src={`http://travelblog.skillbox.cc${getUser.data.photo}`}
              alt="Фотография пользователя"
              onLoad={() => setIsImageLoading(false)}
              onError={(e) => {
                e.currentTarget.src = "";
                setIsImageLoading(false);
              }}
              style={{
                opacity: isImageLoading ? "0" : "1",
              }}
            />
          </div>
        ) : null}
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
