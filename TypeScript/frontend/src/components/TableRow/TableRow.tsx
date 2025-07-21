import { useState, type FC } from "react";
import type { DataProps } from "./types";
import { useRandomImage } from "../../hooks/useRandomImage";
import EmptyPhoto from "../../assets/images/music/music-img.png";
import EmptyPhoto2x from "../../assets/images/music/music-img@2x.png";
import styles from "./TableRow.module.scss";
import { ScaleLoader } from "react-spinners";
import IconFavorite from "/src/assets/images/svg/icon-favorite.svg?react";
import IconDoted from "/src/assets/images/svg/icon-dotes.svg?react";
import { useDispatch } from "react-redux";
import { audioPlayerAction } from "../../store/audioPlayerSlice";
import { audioPlayerActivemImageAction } from "../../store/audioPlayerActiveImage";

export const TableRow: FC<DataProps> = ({ track, index }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const randomImage = useRandomImage(track.id);
  const dispatch = useDispatch();

  const getDataAddTrack = () => {
    const data = Math.floor(Math.random() * 30) + 1;
    return `${data} дней назад`;
  };

  function handleTrackClick() {
    const audioSrc = `data:audio/mp3;base64,${track.encoded_audio}`;
    dispatch(
      audioPlayerAction({
        audioPlayerValue: {
          id: track.id,
          title: track.title,
          artist: track.artist,
          duration: track.duration,
          size_mb: track.size_mb,
          encoded_audio: audioSrc,
          autoPlay: true
        },
      })
    );
    dispatch(
      audioPlayerActivemImageAction({
        audioPlayerActiveImageValue: randomImage.data?.urls.regular
          ? randomImage.data?.urls.regular
          : EmptyPhoto,
      })
    );
  }

  return (
    <tr key={track.id}>
      <td className={styles.tableRow__index} onClick={handleTrackClick}>
        {index + 1}
      </td>
      <td className={styles.tableRow__inner} onClick={handleTrackClick}>
        {randomImage.isLoading ? (
          <ScaleLoader color="#FC6D3E" />
        ) : (
          <img
            className={styles.tableRow__image}
            src={
              randomImage.isSuccess
                ? randomImage.data?.urls.regular
                : EmptyPhoto
            }
            srcSet={
              randomImage.isSuccess
                ? randomImage.data?.urls.regular
                : EmptyPhoto2x
            }
            alt="Изображение альбома"
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              e.currentTarget.src = EmptyPhoto;
              setIsImageLoading(false);
            }}
            style={{
              opacity: isImageLoading ? "0" : "1",
            }}
          />
        )}
        <div className={styles.tableRow__innerInfo}>
          <span className={styles.tableRow__innerTitle}>{track.title}</span>
          <span className={styles.tableRow__innerArtist}>{track.artist}</span>
        </div>
      </td>
      <td className={styles.tableRow__title} onClick={handleTrackClick}>
        {track.title}
      </td>
      <td className={styles.tableRow__data} onClick={handleTrackClick}>
        {getDataAddTrack()}
      </td>
      <td>
        <ul className={styles.tableRow__list}>
          <li>
            <IconFavorite className={styles.tableRow__listFavorite} />
          </li>
          <li>
            <span className={styles.tableRow__listTime}>
              {track.duration.toString().split(".").join(":")}
            </span>
          </li>
          <li>
            <IconDoted className={styles.tableRow__listDotes} />
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
