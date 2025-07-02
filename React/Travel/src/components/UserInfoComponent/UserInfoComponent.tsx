import IconPhoto from "../../assets/images/svg/icon-photo.svg?react";
import { FC, useState } from "react";
import styles from "./UserInfoComponent.module.scss";
import { UserInfoProps } from "./types";
import { Button } from "../Button";
import IconEdit from "../../assets/images/svg/icon-edit.svg?react";
import { useDispatch } from "react-redux";
import { setEditFormValue } from "../../store/editFormSlice";
import { FadeLoader } from "react-spinners";
import ImageNone from "/src/assets/images/posts/image-none.png";
import { AnimatePresence, motion } from "motion/react";

export const UserInfoComponent: FC<UserInfoProps> = ({ data, loading }) => {
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handleEditUser = () => {
    dispatch(setEditFormValue({ editFormValue: true }));
  };

  return (
    <div className={styles.userInfo}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
          >
            <div className={styles.userInfo__wrapper}>
              <div className={styles.userInfo__image}>
                <div className={styles.userInfo__photo}>
                  {isImageLoading && (
                    <FadeLoader
                      cssOverride={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(0, 0)",
                      }}
                      color="#ffa902"
                    />
                  )}
                  <img
                    className={styles.userInfo__photoImg}
                    src={
                      data?.photo
                        ? `https://travelblog.skillbox.cc${data.photo}`
                        : ImageNone
                    }
                    alt="Изображение поста"
                    onLoad={() => setIsImageLoading(false)}
                    onError={(e) => {
                      e.currentTarget.src = ImageNone;
                      setIsImageLoading(false);
                    }}
                    style={{
                      opacity: isImageLoading ? "0" : "1",
                    }}
                  />
                </div>
                <Button
                  title={
                    <span className={styles.userInfo__photoBlock}>
                      <IconPhoto className={styles.userInfo__photoSvg} />
                      <span className={styles.userInfo__photoText}>
                        Изменить фото
                      </span>
                    </span>
                  }
                  type="button"
                  variant="link"
                  size="none"
                  isDisable={loading}
                  isLoading={loading}
                  onClick={handleEditUser}
                />
              </div>
              <div className={styles.userInfo__Inner}>
                <div className={styles.userInfo__title}>
                  <h3 className={styles.userInfo__titleText}>
                    {data?.full_name}
                  </h3>
                  <div>
                    <Button
                      title={<IconEdit className={styles.userInfo__svg} />}
                      type="button"
                      variant="svg"
                      size="none"
                      isDisable={loading}
                      isLoading={loading}
                      onClick={handleEditUser}
                    />
                  </div>
                </div>
                <div className={styles.userInfo__country}>
                  <span className={styles.userInfo__countryTitle}>Страна:</span>
                  <span className={styles.userInfo__countryText}>
                    {data?.country}
                  </span>
                </div>
                <div className={styles.userInfo__city}>
                  <span className={styles.userInfo__cityTitle}>Город:</span>
                  <span className={styles.userInfo__cityText}>
                    {data?.city}
                  </span>
                </div>
                <div className={styles.userInfo__bio}>
                  <span className={styles.userInfo__bioTitle}>О себе:</span>
                  <span className={styles.userInfo__bioText}>{data?.bio}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserInfoComponent;
