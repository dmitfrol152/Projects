import { FC } from "react";
import { PostItemProps } from "./types";
import styles from "./PostItemComponent.module.scss";
import { Link } from "react-router";
import ImageNone from "/src/assets/images/posts/image-none.png";

export const PostItemComponent: FC<PostItemProps> = ({ post }) => {
  return (
    <div className={styles.card}>
      <h2 className="visually-hidden">Описание карточки</h2>
      <img
        className={styles.card__photo}
        src={post.photo ? post.photo : ImageNone}
        alt="Изображение поста"
        onError={(e) => {
          e.currentTarget.src = ImageNone;
        }}
      />
      <div className={styles.card__info}>
        <div>
          <h3 className={styles.card__infoTitle}>{post.title}</h3>
          <p className={styles.card__infoDescription}>{post.excerpt}</p>
        </div>
        <div>
          <span className={styles.card__infoCountry}>{post.county}</span>
          <Link className={styles.card__infoLink} to={"#"}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItemComponent;
