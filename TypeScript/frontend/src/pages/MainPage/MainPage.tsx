import { useDispatch, useSelector } from "react-redux";
import { SideNav } from "../../components/SideNav";
import { Tracks } from "../../components/Tracks";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "./MainPage.module.scss";
import type { AuthUserResultProps, ValueSearchProps } from "./types";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { authUserAction } from "../../store/authUserSlice";
import { useSearchParams } from "react-router";
import { TracksFavorite } from "../../components/TracksFavorite";
import type { AudioPlayerNameProps } from "../../store/types";

export const MainPage = () => {
  const authUserResult = useSelector(
    (state: AuthUserResultProps) => state.authUserName.authUserValue
  );
  const { getFavoritesTracks, getTracks } = useFavorites(authUserResult);
  const [page, setPage] = useState<number>(1);
  const value = useSelector(
    (state: ValueSearchProps) => state.searchName.searchValue
  );
  const debouncedSearchValue = useDebounce(value, 500);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isTrackPlaying = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(
    isTrackPlaying && isTrackPlaying !== null ? true : false
  );
  const [openedModalId, setOpenedModalId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handlerResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 768) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth]);

  const LIMIT = 10;

  useEffect(() => {
    setIsPlaying(isTrackPlaying && isTrackPlaying !== null ? true : false);
  }, [isTrackPlaying]);

  const filtredTracks =
    getTracks.data?.filter((track) => {
      if (debouncedSearchValue !== "") {
        return (
          track.artist.toLowerCase().includes(debouncedSearchValue) ||
          track.title.toLowerCase().includes(debouncedSearchValue)
        );
      }
      return true;
    }) || [];

  const filtredFavoritesTracks =
    getFavoritesTracks.data?.filter((track) => {
      if (debouncedSearchValue !== "") {
        return (
          track.artist.toLowerCase().includes(debouncedSearchValue) ||
          track.title.toLowerCase().includes(debouncedSearchValue)
        );
      }
      return true;
    }) || [];

  const tracks = filtredTracks.slice(0, page * LIMIT);

  const favoriteTracks = filtredFavoritesTracks.slice(0, page * LIMIT);

  function handleMusicMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (getFavoritesTracks.isError || !authUserResult) {
    return (
      <div
        className={
          isPlaying
            ? styles.mainPage
            : `${styles.mainPage} ${styles.footerNull}`
        }
      >
        <div className="container">
          <div className={styles.mainPage__wrapper}>
            <SideNav userIsAuth={authUserResult ? true : false} />
            <Tracks
              data={tracks}
              openedModalId={openedModalId}
              setOpenedModalId={setOpenedModalId}
            />
            {windowWidth > 768 && filtredTracks.length > tracks.length ? (
              <Button
                title="Показать еще"
                type="button"
                variant="secondary"
                size="secondary"
                onClick={handleMusicMore}
                isLoading={getTracks.isLoading}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (getFavoritesTracks.isSuccess) {
    dispatch(authUserAction({ authUserValue: true }));
    return (
      <>
        {searchParams.get("music") === "favorites" ? (
          <div
            className={
              isPlaying
                ? styles.mainPage
                : `${styles.mainPage} ${styles.footerNull}`
            }
          >
            <div className="container">
              <div className={styles.mainPage__wrapper}>
                <SideNav userIsAuth={authUserResult ? true : false} />
                <TracksFavorite
                  data={favoriteTracks}
                  openedModalId={openedModalId}
                  setOpenedModalId={setOpenedModalId}
                />
                {windowWidth > 768 &&
                filtredFavoritesTracks.length > tracks.length ? (
                  <Button
                    title="Показать еще"
                    type="button"
                    variant="secondary"
                    size="secondary"
                    onClick={handleMusicMore}
                    isLoading={getFavoritesTracks.isLoading}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              isPlaying
                ? styles.mainPage
                : `${styles.mainPage} ${styles.footerNull}`
            }
          >
            <div className="container">
              <div className={styles.mainPage__wrapper}>
                <SideNav userIsAuth={authUserResult ? true : false} />
                <Tracks
                  data={tracks}
                  openedModalId={openedModalId}
                  setOpenedModalId={setOpenedModalId}
                />
                {windowWidth > 768 && filtredTracks.length > tracks.length ? (
                  <Button
                    title="Показать еще"
                    type="button"
                    variant="secondary"
                    size="secondary"
                    onClick={handleMusicMore}
                    isLoading={getTracks.isLoading}
                  />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Other
  return (
    <div className={styles.mainPage__error}>
      <h1 className={styles.mainPage__errorText}>Главная страница сайта</h1>
      <p className={styles.mainPage__errorText}>
        Здесь должно было быть много интерсного. Но что-то пошло не так.
      </p>
    </div>
  );
};

export default MainPage;
