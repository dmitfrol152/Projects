import { FC, useState } from "react";
import styles from "./Trailer.module.scss";
import { Button } from "../Button/Button";
import IconClose from "../../assets/images/icon-close.svg?react";
import PlayIcon from "../../assets/images/icon-play.svg?react";
import { VisibleTrailerProps } from "./types";
import ReactPlayer from "react-player";

export const Trailer: FC<VisibleTrailerProps> = ({
  visible,
  onClose,
  trailerId,
  backdropUrl,
  title,
}) => {
  const [isPlaingForTitle, setIsPlaingForTitle] = useState<boolean | null>(
    null
  );
  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(true);

  function handleCloseTrailer() {
    if (onClose) {
      setIsPlayingTrailer(false);
      onClose();
    }
  }

  return (
    <div
      className={`${styles.trailer} ${
        visible === true ? styles.visibleTrailer : ""
      }`}
      onClick={handleCloseTrailer}
    >
      <div
        className={styles.trailer__wrapper}
        onClick={(event) => event.stopPropagation()}
      >
        <ReactPlayer
          light
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          url={`https://youtube.com/watch?v=${trailerId}`}
          playIcon={
            <PlayIcon
              className={styles.trailer__control}
              width="80"
              height="80"
            />
          }
          width="100%"
          height="540px"
          playing={isPlayingTrailer}
          style={{ backgroundImage: `url(${backdropUrl})` }}
          onPlay={() => {
            setIsPlayingTrailer(true);
            setIsPlaingForTitle(true);
          }}
          onPause={() => {
            setIsPlayingTrailer(false);
            setIsPlaingForTitle(false);
          }}
        />
        {isPlayingTrailer === false && isPlaingForTitle === false && (
          <>
            <div className={styles.trailer__title}>{title}</div>
            <div className={styles.trailer__trailer}>Трейлер</div>
          </>
        )}
        <Button
          title={<IconClose className={styles.trailer__close} />}
          type="button"
          variant="close"
          onClick={handleCloseTrailer}
        />
      </div>
    </div>
  );
};
