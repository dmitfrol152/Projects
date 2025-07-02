import { FC, useState } from "react";
import { PostItemProps } from "./types";
import styles from "./PostItemComponent.module.scss";
import { Link } from "react-router";
import ImageNone from "/src/assets/images/posts/image-none.png";
import { FadeLoader } from "react-spinners";

export const PostItemComponent: FC<PostItemProps> = ({ post }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <div className={styles.card}>
      <h2 className="visually-hidden">Описание карточки</h2>
      <div className={styles.card__photo}>
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
          className={styles.card__photoImg}
          src={
            post.photo
              ? `https://travelblog.skillbox.cc${post.photo}`
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
      <div className={styles.card__info}>
        <div>
          <h3 className={styles.card__infoTitle}>{post.title}</h3>
          <p className={styles.card__infoDescription}>{post.excerpt}</p>
        </div>
        <div>
          <span className={styles.card__infoCountry}>{post.county}</span>
          <Link className={styles.card__infoLink} to={`/posts/${post.id}`}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItemComponent;
