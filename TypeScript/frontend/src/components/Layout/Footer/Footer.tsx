import { useSelector } from "react-redux";
import type { AudioPlayerNameProps } from "../../../store/types";
import styles from "./Footer.module.scss";
import { Audioplayer } from "../../Audioplayer";

export const Footer = () => {
  const isTrackPlaying = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );

  if (!isTrackPlaying) {
    return (
      <p className={styles.footer__owner}>
        Все права защищены. Разработчик: Фролков Д.В.
      </p>
    );
  }

  return (
    <footer className={styles.footer}>
      <Audioplayer track={isTrackPlaying} />
    </footer>
  );
};

export default Footer;
