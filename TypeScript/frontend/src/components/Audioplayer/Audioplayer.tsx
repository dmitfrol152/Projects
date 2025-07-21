import { useEffect, useRef, useState, type FC } from "react";
import type { TrackProps } from "./types";
import { useSelector } from "react-redux";
import type { AudioPlayerNameActiveImageProps } from "../../store/types";
import styles from "./Audioplayer.module.scss";
import IconFavorite from "/src/assets/images/svg/icon-favorite.svg?react";
import IconShuffle from "/src/assets/images/svg/icon-shuffle.svg?react";
import IconBackTrack from "/src/assets/images/svg/icon-skip-back.svg?react";
import IconPlay from "/src/assets/images/svg/icon-play.svg?react";
import IconPause from "/src/assets/images/svg/icon-pause.svg?react";
import IconForwardTrack from "/src/assets/images/svg/icon-skip-forward.svg?react";
import IconRepeat from "/src/assets/images/svg/icon-repeat.svg?react";
import IconVolume from "/src/assets/images/svg/icon-volume.svg?react";
import { Button } from "../Button";

export const Audioplayer: FC<TrackProps> = ({ track }) => {
  const isImagePlaying = useSelector(
    (state: AudioPlayerNameActiveImageProps) =>
      state.audioPlayerActiveImageName.audioPlayerActiveImageValue
  );
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (track?.autoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track.encoded_audio]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.duration > 0) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    } else {
      setProgress(0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  function formatTime(time: number) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  }

  console.log(track.encoded_audio);

  return (
    <div className={styles.audioplayer}>
      <div className="container">
        <div className={styles.audioplayer__wrapper}>
          <div className={styles.audioplayer__inner}>
            <img
              className={styles.audioplayer__image}
              src={isImagePlaying}
              srcSet={isImagePlaying}
              alt="Изображение альбома"
              onLoad={() => setIsImageLoading(false)}
              style={{
                opacity: isImageLoading ? "0" : "1",
              }}
            />
            <div className={styles.audioplayer__info}>
              <div className={styles.audioplayer__infoBlock}>
                <span className={styles.audioplayer__infoBlockTitle}>
                  {track.title}
                </span>
                <IconFavorite className={styles.audioplayer__infoBlockIcon} />
              </div>
              <span className={styles.audioplayer__infoBlockArtist}>
                {track.artist}
              </span>
            </div>
          </div>
          <div className={styles.audioplayer__audio}>
            <audio
              src={track.encoded_audio}
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            <div className={styles.audioplayer__audioButtons}>
              <Button
                title={
                  <IconShuffle
                    className={styles.audioplayer__audioButtonsShuffle}
                  />
                }
                type="button"
                variant="link"
                size="none"
              />
              <Button
                title={
                  <IconBackTrack
                    className={styles.audioplayer__audioButtonsBack}
                  />
                }
                type="button"
                variant="link"
                size="none"
              />
              <Button
                title={
                  isPlaying ? (
                    <span className={styles.audioplayer__audioButtonsCercle}>
                      <IconPause
                        className={styles.audioplayer__audioButtonsPause}
                      />
                    </span>
                  ) : (
                    <span className={styles.audioplayer__audioButtonsCercle}>
                      <IconPlay
                        className={styles.audioplayer__audioButtonsPlay}
                      />
                    </span>
                  )
                }
                type="button"
                variant="link"
                size="none"
                onClick={handlePlayPause}
              />
              <Button
                title={
                  <IconForwardTrack
                    className={styles.audioplayer__audioButtonsForward}
                  />
                }
                type="button"
                variant="link"
                size="none"
              />
              <Button
                title={
                  <IconRepeat
                    className={styles.audioplayer__audioButtonsRepeat}
                  />
                }
                type="button"
                variant="link"
                size="none"
              />
            </div>
            <div className={styles.audioplayer__audioDuration}>
              <span className={styles.audioplayer__audioDurationTime}>
                {formatTime(currentTime)}
              </span>
              <input
                className={styles.audioplayer__audioDurationInput}
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handleProgressChange}
                style={{ "--progress": `${progress}%` } as React.CSSProperties}
              />
              <span className={styles.audioplayer__audioDurationTime}>
                {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className={styles.audioplayer__audioVolume}>
            <IconVolume className={styles.audioplayer__audioVolumeIcon} />
            <input
              className={styles.audioplayer__audioVolumeInput}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              style={
                { "--progress": `${volume * 100}%` } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audioplayer;
