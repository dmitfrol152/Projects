import { FC, useEffect, useState } from "react";
import { InfoPostProps } from "./types";
import styles from "./InfoPostComponent.module.scss";
import ImageNone from "/src/assets/images/posts/image-none.png";
import { Button } from "../Button";
import { useNavigate, useSearchParams } from "react-router";
import { useUser } from "../../hooks/useUser";
import IconBack from "../../assets/images/svg/icon-back.svg?react";
import { FadeLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import { AnimatePresence, motion } from "motion/react";

export const InfoPostComponent: FC<InfoPostProps> = ({ data, loading }) => {
  const { getUser } = useUser();
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handleBack = () => {
    navigate("/");
  };

  const handleAddComment = () => {
    if (getUser.isError) {
      setSearchParams({ auth: "login" });
      return;
    }

    if (getUser.isSuccess) {
      setSearchParams({ add: "review" });
      return;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [getUser]);

  // skeleton
  if (!data && loading) {
    return (
      <section className={styles.infoPost}>
        <div className="container">
          <div className={styles.infoPost__wrapper}>
            <div className={styles.infoPost__photo}>
              <Skeleton
                height={450}
                highlightColor="#ecebeb"
                baseColor="#bcbcbc"
              />
            </div>
            <div className={styles.infoPost__inner}>
              <div className={styles.infoPost__info}>
                <h2 className={styles.infoPost__infoTitle}>
                  <Skeleton
                    height={54}
                    highlightColor="#ecebeb"
                    baseColor="#bcbcbc"
                  />
                </h2>
                <p className={styles.infoPost__infoDescription}>
                  <Skeleton
                    height={200}
                    highlightColor="#ecebeb"
                    baseColor="#bcbcbc"
                  />
                </p>
                <ul className={styles.infoPost__infoList}>
                  {Array(3)
                    .fill(3)
                    .map((_, i) => (
                      <li key={i}>
                        <span className={styles.infoPost__infoItemTitle}>
                          <Skeleton
                            height={24}
                            highlightColor="#ecebeb"
                            baseColor="#bcbcbc"
                          />
                        </span>
                        <span className={styles.infoPost__infoItemCreated}>
                          <Skeleton
                            height={24}
                            highlightColor="#ecebeb"
                            baseColor="#bcbcbc"
                          />
                        </span>
                        <p className={styles.infoPost__infoItemDescription}>
                          <Skeleton
                            height={82}
                            highlightColor="#ecebeb"
                            baseColor="#bcbcbc"
                          />
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
              <div className={styles.infoPost__buttons}>
                <Skeleton
                  height={51}
                  width={150}
                  highlightColor="#ecebeb"
                  baseColor="#bcbcbc"
                />
                <Skeleton
                  height={51}
                  width={150}
                  highlightColor="#ecebeb"
                  baseColor="#bcbcbc"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.infoPost}>
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
            <div className={styles.infoPost__wrapper}>
              <div className={styles.infoPost__photo}>
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
                  className={styles.infoPost__photoImg}
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
              <div className={styles.infoPost__inner}>
                <div className={styles.infoPost__info}>
                  <h2 className={styles.infoPost__infoTitle}>{data?.title}</h2>
                  <p className={styles.infoPost__infoDescription}>
                    {data?.description}
                  </p>
                  <ul className={styles.infoPost__infoList}>
                    {data?.comments.map((comment) => {
                      return (
                        <li
                          className={styles.infoPost__infoItem}
                          key={comment.created_at}
                        >
                          <span className={styles.infoPost__infoItemTitle}>
                            {comment.author_name}
                          </span>
                          <span className={styles.infoPost__infoItemCreated}>
                            {new Date(comment.created_at).toLocaleDateString(
                              "ru-RU"
                            )}
                          </span>
                          <p className={styles.infoPost__infoItemDescription}>
                            {comment.comment}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={styles.infoPost__buttons}>
                  <Button
                    title={
                      <div className={styles.infoPost__buttonsBack}>
                        <IconBack className={styles.infoPost__buttonsSvg} />
                        <span className={styles.infoPost__buttonsText}>
                          Назад
                        </span>
                      </div>
                    }
                    variant="secondary"
                    type="button"
                    size="svg"
                    onClick={handleBack}
                    isDisable={false}
                    isLoading={false}
                  />
                  <Button
                    title="Ваше впечатление об этом месте"
                    type="submit"
                    variant="primary"
                    size="main"
                    isDisable={false}
                    isLoading={false}
                    onClick={handleAddComment}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InfoPostComponent;
