import { FC } from "react";
import { PostItemComponent } from "../PostItemComponent";
import { PostsListProps } from "./types";
import { Button } from "../Button";
import styles from "./PostsListComponent.module.scss";
import { useDispatch } from "react-redux";
import { useUser } from "../../hooks/useUser";
import { setLoginType } from "../../store/authTypeSlice";

export const PostsListComponent: FC<PostsListProps> = ({ data, loading }) => {
  const dispatch = useDispatch();
  const { getUser } = useUser();

  if (loading || !data) {
    return;
  }

  const handleAddPost = () => {
    if (getUser.isError) {
      dispatch(setLoginType());
    }
  };

  return (
    <section className={styles.posts}>
      <div className="container">
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
      </div>
    </section>
  );
};

export default PostsListComponent;
