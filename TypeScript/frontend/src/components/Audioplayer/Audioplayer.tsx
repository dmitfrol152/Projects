import { useEffect, useRef, useState, type FC } from "react";
import type { trackIdProps, TrackProps } from "./types";
import { useSelector } from "react-redux";
import type {
  audioGroupChoiceNameProps,
  AudioPlayerNameActiveImageProps,
} from "../../store/types";
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
import { useMutation } from "@tanstack/react-query";
import {
  fetchDeleteFavoritesTracks,
  fetchPostFavoritesTracks,
} from "../../api/Favorites/Favorites";
import { queryClient } from "../../api/queryClient";
import { useNavigate } from "react-router";

export const Audioplayer: FC<TrackProps> = ({
  track,
  tracks,
  favoritesTracks,
  currentTrackIndex,
  setCurrentTrackIndex,
}) => {
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
  const [shuffleMode, setShuffleMode] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<boolean>(false);
  const audioGroupChoice = useSelector(
    (state: audioGroupChoiceNameProps) =>
      state.audioGroupChoiceName.audioGroupChoiceValue
  );
  const [image, setImage] = useState<string | undefined>(isImagePlaying);
  const navigate = useNavigate();

  useEffect(() => {
    setImage(isImagePlaying);
  }, [isImagePlaying]);

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
  }, [track.encoded_audio, track.autoPlay]);

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

  const handleEnded = () => {
    setIsPlaying(false);
    if (
      tracks &&
      typeof currentTrackIndex === "number" &&
      setCurrentTrackIndex
    ) {
      if (shuffleMode) {
        let random = currentTrackIndex;
        while (tracks.length > 1 && random === currentTrackIndex) {
          random = Math.floor(Math.random() * tracks.length);
        }
        setCurrentTrackIndex(random);
      } else if (repeatMode) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else if (
        audioGroupChoice === true &&
        tracks &&
        favoritesTracks &&
        favoritesTracks.length > 0
      ) {
        const currentTrackId = tracks[currentTrackIndex].id;
        const favoritesIndex = favoritesTracks.findIndex(
          (track) => track.id === currentTrackId
        );
        if (favoritesIndex < favoritesTracks.length - 1) {
          const nextFavoritesTrackId = favoritesTracks[favoritesIndex + 1].id;
          const nextTrackIndex = tracks.findIndex(
            (track) => track.id === nextFavoritesTrackId
          );
          if (nextTrackIndex !== -1) {
            setCurrentTrackIndex(nextTrackIndex);
          }
        }
      } else if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    }
  };

  const handleNext = () => {
    if (typeof currentTrackIndex === "number" && setCurrentTrackIndex) {
      if (audioGroupChoice === false && tracks) {
        if (shuffleMode) {
          let random = currentTrackIndex;
          while (tracks.length > 1 && random === currentTrackIndex) {
            random = Math.floor(Math.random() * tracks.length);
          }
          setCurrentTrackIndex(random);
        } else if (currentTrackIndex < tracks.length - 1) {
          setCurrentTrackIndex(currentTrackIndex + 1);
        }
      } else if (audioGroupChoice === true && favoritesTracks) {
        if (shuffleMode) {
          let random = currentTrackIndex;
          while (favoritesTracks.length > 1 && random === currentTrackIndex) {
            random = Math.floor(Math.random() * favoritesTracks.length);
          }
          setCurrentTrackIndex(random);
        } else if (tracks && favoritesTracks && favoritesTracks.length > 0) {
          const currentTrackId = tracks[currentTrackIndex].id;
          const favoritesIndex = favoritesTracks.findIndex(
            (track) => track.id === currentTrackId
          );

          if (favoritesIndex < favoritesTracks.length - 1) {
            const nextFavoritesTrackId = favoritesTracks[favoritesIndex + 1].id;
            const nextTrackIndex = tracks.findIndex(
              (track) => track.id === nextFavoritesTrackId
            );

            if (nextTrackIndex) {
              setCurrentTrackIndex(nextTrackIndex);
            }
          }
        }
      }
    }
  };

  const handlePrev = () => {
    if (
      tracks &&
      typeof currentTrackIndex === "number" &&
      setCurrentTrackIndex &&
      currentTrackIndex > 0 &&
      audioGroupChoice === false
    ) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else if (
      audioGroupChoice === true &&
      tracks &&
      favoritesTracks &&
      favoritesTracks.length > 0 &&
      currentTrackIndex
    ) {
      const currentTrackId = tracks[currentTrackIndex].id;
      const favoritesIndex = favoritesTracks.findIndex(
        (track) => track.id === currentTrackId
      );
      if (favoritesIndex > 0) {
        const prevFavoritesTrackId = favoritesTracks[favoritesIndex - 1].id;
        const prevTrackIndex = tracks.findIndex(
          (track) => track.id === prevFavoritesTrackId
        );
        if (prevTrackIndex !== -1) {
          setCurrentTrackIndex(prevTrackIndex);
        }
      }
    }
  };

  const handleShuffle = () => {
    setShuffleMode((prev) => !prev);
    if (
      tracks &&
      typeof currentTrackIndex === "number" &&
      setCurrentTrackIndex
    ) {
      if (
        audioGroupChoice === true &&
        favoritesTracks &&
        favoritesTracks.length > 0 &&
        tracks
      ) {
        const randomFavorites = favoritesTracks.findIndex(
          (track) => track.id === tracks[currentTrackIndex].id
        );
        let newRandomFavorites = randomFavorites;
        while (
          favoritesTracks.length > 1 &&
          newRandomFavorites === randomFavorites
        ) {
          newRandomFavorites = Math.floor(
            Math.random() * favoritesTracks.length
          );
        }
        const nextFavoritesTrackId = favoritesTracks[newRandomFavorites].id;
        const nextTrackIndex = tracks.findIndex(
          (track) => track.id === nextFavoritesTrackId
        );
        if (nextTrackIndex !== -1) {
          setCurrentTrackIndex(nextTrackIndex);
        }
      } else if (tracks) {
        let random = currentTrackIndex;
        while (tracks.length > 1 && random === currentTrackIndex) {
          random = Math.floor(Math.random() * tracks.length);
        }
        setCurrentTrackIndex(random);
      }
    }
  };

  const handleRepeat = () => {
    setRepeatMode((prev) => !prev);
    // setCurrentTrackIndex(currentTrackIndex);
  };

  const findedTrackInFavorite = favoritesTracks?.find(
    (trackFavorite) => trackFavorite.id === track.id
  );

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

  const handleFavoriteAdd = () => {
    const trackId = track.id;
    if (findedTrackInFavorite) {
      deleteFavoritesTracks.mutate({ trackId });
    } else {
      postFavoritesTracks.mutate({ trackId });
    }
  };

  return (
    <div className={styles.audioplayer}>
      <div className="container">
        <div className={styles.audioplayer__wrapper}>
          <div className={styles.audioplayer__inner}>
            <img
              className={styles.audioplayer__image}
              src={image}
              srcSet={image}
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
                <Button
                  title={
                    <IconFavorite
                      className={
                        !findedTrackInFavorite
                          ? styles.audioplayer__infoBlockIcon
                          : `${styles.audioplayer__infoBlockIcon} ${styles.isFavoriteTrack}`
                      }
                    />
                  }
                  type="button"
                  variant="link"
                  size="none"
                  onClick={handleFavoriteAdd}
                />
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
              onEnded={handleEnded}
            />
            <div className={styles.audioplayer__audioButtons}>
              <Button
                title={
                  <IconShuffle
                    className={
                      shuffleMode
                        ? `${styles.audioplayer__audioButtonsShuffle} ${styles.isActive}`
                        : styles.audioplayer__audioButtonsShuffle
                    }
                  />
                }
                type="button"
                variant="link"
                size="none"
                onClick={handleShuffle}
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
                onClick={handlePrev}
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
                onClick={handleNext}
              />
              <Button
                title={
                  <IconRepeat
                    className={
                      repeatMode
                        ? `${styles.audioplayer__audioButtonsRepeat} ${styles.isActive}`
                        : styles.audioplayer__audioButtonsRepeat
                    }
                  />
                }
                type="button"
                variant="link"
                size="none"
                onClick={handleRepeat}
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
