import { FC, useEffect } from "react";
import { PostItemComponent } from "../PostItemComponent";
import { PostsListProps } from "./types";
import { Button } from "../Button";
import styles from "./PostsListComponent.module.scss";
import { useUser } from "../../hooks/useUser";
import { useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "motion/react";

export const PostsListComponent: FC<PostsListProps> = ({ data, loading }) => {
  const { getUser } = useUser();
  const [, setSearchParams] = useSearchParams();

  const handleAddPost = () => {
    if (getUser.isError) {
      setSearchParams({ auth: "login" });
      return;
    }
    if (getUser.isSuccess) {
      setSearchParams({ add: "post" });
      return;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [getUser]);

  // skeleton
  if (loading || !data) {
    return (
      <section className={styles.posts}>
        <div className="container">
          <ul className={styles.posts__list}>
            {Array(9)
              .fill(9)
              .map((_, i) => (
                <li key={i} className={styles.posts__item}>
                  <Skeleton
                    height={552}
                    highlightColor="#ecebeb"
                    baseColor="#bcbcbc"
                    borderRadius="2.25rem"
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.posts}>
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
          >
            <ul className={styles.posts__list}>
              {data.map((post) => {
                return (
                  <li className={styles.posts__item} key={post.id}>
                    <PostItemComponent post={post} />
                  </li>
                );
              })}
            </ul>
            <Button
              title="Добавить мое путешествие"
              type="button"
              variant="primary"
              size="main"
              isDisable={false}
              isLoading={false}
              onClick={handleAddPost}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PostsListComponent;
