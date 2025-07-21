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
  const { getFavoritesTracks, getTracks } = useFavorites();
  const [page, setPage] = useState<number>(1);
  const authUserResult = useSelector(
    (state: AuthUserResultProps) => state.authUserName.authUserValue
  );
  const value = useSelector(
    (state: ValueSearchProps) => state.searchName.searchValue
  );
  const debouncedSearchValue = useDebounce(value, 500);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isTrackPlaying = useSelector(
    (state: AudioPlayerNameProps) => state.audioPlayerName.audioPlayerValue
  );

  const LIMIT = 10;

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

  if (getFavoritesTracks.isError) {
    return (
      <div
        className={
          isTrackPlaying !== null
            ? styles.mainPage
            : `${styles.mainPage} ${styles.footerNull}`
        }
      >
        <div className="container">
          <div className={styles.mainPage__wrapper}>
            <SideNav userIsAuth={authUserResult ? true : false} />
            <Tracks data={tracks} />
            {filtredTracks.length > tracks.length ? (
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
              isTrackPlaying !== null
                ? styles.mainPage
                : `${styles.mainPage} ${styles.footerNull}`
            }
          >
            <div className="container">
              <div className={styles.mainPage__wrapper}>
                <SideNav userIsAuth={authUserResult ? true : false} />
                <TracksFavorite data={favoriteTracks} />
                {filtredFavoritesTracks.length > tracks.length ? (
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
          <div className={styles.mainPage}>
            <div className="container">
              <div className={styles.mainPage__wrapper}>
                <SideNav userIsAuth={authUserResult ? true : false} />
                <Tracks data={tracks} />
                {filtredTracks.length > tracks.length ? (
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

  // if (getFavoritesTracks.isLoading) {
  // }

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
