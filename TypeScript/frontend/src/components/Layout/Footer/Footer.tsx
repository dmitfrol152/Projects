import { useDispatch, useSelector } from "react-redux";
import type { AudioPlayerNameProps } from "../../../store/types";
import styles from "./Footer.module.scss";
import { Audioplayer } from "../../Audioplayer";
import { useFavorites } from "../../../hooks/useFavorites";
import { useEffect, useState } from "react";
import { currentTrackIndexAction } from "../../../store/currentTrackIndexSlice";

export const Footer = () => {
  const isTrackPlaying = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );
  const { getTracks, getFavoritesTracks } = useFavorites();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    isTrackPlaying ? isTrackPlaying?.id - 1 : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTrackPlaying) {
      setCurrentTrackIndex(isTrackPlaying?.id - 1);
    }
  }, [isTrackPlaying]);

  useEffect(() => {
    dispatch(
      currentTrackIndexAction({ currentTrackIndexValue: currentTrackIndex })
    );
  }, [currentTrackIndex, dispatch]);

  if (!isTrackPlaying || !getTracks.data) {
    return (
      <p className={styles.footer__owner}>
        Все права защищены. Разработчик: Фролков Д.В.
      </p>
    );
  }

  if (currentTrackIndex !== null) {
    return (
      <footer className={styles.footer}>
        <Audioplayer
          track={{ ...getTracks.data[currentTrackIndex], autoPlay: true }}
          tracks={getTracks.data}
          favoritesTracks={getFavoritesTracks.data}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
        />
      </footer>
    );
  }
};

export default Footer;
