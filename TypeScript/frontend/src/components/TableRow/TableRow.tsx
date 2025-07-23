import { useState, type FC } from "react";
import type { DataProps, trackIdProps } from "./types";
import { useRandomImage } from "../../hooks/useRandomImage";
import EmptyPhoto from "../../assets/images/music/music-img.png";
import EmptyPhoto2x from "../../assets/images/music/music-img@2x.png";
import styles from "./TableRow.module.scss";
import { ScaleLoader } from "react-spinners";
import IconFavorite from "/src/assets/images/svg/icon-favorite.svg?react";
import IconDoted from "/src/assets/images/svg/icon-dotes.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { audioPlayerAction } from "../../store/audioPlayerSlice";
import { audioPlayerActivemImageAction } from "../../store/audioPlayerActiveImage";
import type {
  currentTrackIndexSelectorProps,
  AudioPlayerNameProps,
} from "../../store/types";
import { Button } from "../Button";
import {
  fetchDeleteFavoritesTracks,
  fetchPostFavoritesTracks,
} from "../../api/Favorites/Favorites";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useNavigate } from "react-router";

export const TableRow: FC<DataProps> = ({
  track,
  index,
  inFavorite,
  openedModalId,
  setOpenedModalId,
}) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const randomImage = useRandomImage(track.id);
  const dispatch = useDispatch();
  const currentIndexTrack = useSelector(
    (state: currentTrackIndexSelectorProps) =>
      state.currentTrackIndexName.currentTrackIndexValue
  );
  const activeTrack = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );
  const navigate = useNavigate();

  const postFavoritesTracks = useMutation({
    mutationFn: ({ trackId }: trackIdProps) =>
      fetchPostFavoritesTracks({ trackId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      navigate("/login");
    },
  });

  const isModal = openedModalId === track.id;

  const deleteFavoritesTracks = useMutation({
    mutationFn: ({ trackId }: trackIdProps) =>
      fetchDeleteFavoritesTracks({ trackId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      navigate("/login");
    },
  });

  const getDataAddTrack = () => {
    const data = Math.floor(Math.random() * 30) + 1;
    return `${data} дней назад`;
  };

  function handleTrackClick() {
    // const audioSrc = `data:audio/mp3;base64,${track.encoded_audio}`;
    dispatch(
      audioPlayerAction({
        audioPlayerValue: {
          id: track.id,
          title: track.title,
          artist: track.artist,
          duration: track.duration,
          size_mb: track.size_mb,
          encoded_audio: track.encoded_audio,
          autoPlay: true,
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

  const handleFavoriteAdd = () => {
    const trackId = track.id;
    if (inFavorite) {
      deleteFavoritesTracks.mutate({ trackId });
    } else {
      postFavoritesTracks.mutate({ trackId });
    }
  };

  const handleOpenModal = () => {
    if (isModal) {
      setOpenedModalId(null);
    } else {
      setOpenedModalId(track.id);
    }
  };

  const handleCloseTrack = () => {
    if (activeTrack && activeTrack.id === track.id) {
      dispatch(audioPlayerAction({ audioPlayerValue: null }));
    }
    setOpenedModalId(null);
  };

  return (
    <tr
      className={
        currentIndexTrack !== null && currentIndexTrack === track.id - 1
          ? styles.isActiveTrack
          : undefined
      }
      key={track.id}
    >
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
            <Button
              title={
                <IconFavorite
                  className={
                    !inFavorite
                      ? styles.tableRow__listFavorite
                      : `${styles.tableRow__listFavorite} ${styles.isFavoriteTrack}`
                  }
                />
              }
              type="button"
              variant="link"
              size="none"
              onClick={handleFavoriteAdd}
            />
          </li>
          <li>
            <span className={styles.tableRow__listTime}>
              {track.duration.toString().split(".").join(":")}
            </span>
          </li>
          <li className={styles.tableRow__listItem}>
            <Button
              title={<IconDoted className={styles.tableRow__listDotes} />}
              type="button"
              variant="link"
              size="none"
              onClick={handleOpenModal}
            />
            {isModal ? (
              <div className={styles.tableRow__modal}>
                <Button
                  title="Закрыть"
                  type="button"
                  variant="secondary"
                  size="secondary"
                  onClick={handleCloseTrack}
                />
              </div>
            ) : null}
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
