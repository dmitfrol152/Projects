import { FC, useEffect, useRef, useState } from "react";
import { ISearchProps } from "./types";
import styles from "./Search.module.scss";
import SearchIcon from "../../assets/images/icon-search.svg?react";
import StarIcon from "../../assets/images/icon-star.svg?react";
import SearchMobileIcon from "../../assets/images/icon-search-mobile.svg?react";
import { Button } from "../Button/Button";
import useSearchMovie from "../../hooks/useSearchMovie";
import { Link, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const Search: FC<ISearchProps> = ({ type, label, placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useSearchMovie();
  const [searchMobileVisible, setSearchMobileVisible] =
    useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const genres = searchParams.get("genres") || "";
  const search = searchParams.get("title") || "";

  const searchTap = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValueSearch = event.target.value;
    const params: Record<string, string> = {};

    if (genres) {
      params.genres = genres;
    }

    if (newValueSearch) {
      params.title = newValueSearch.toLowerCase();
    }

    setSearchParams(params);
  };

  const handleDeleteSearchValue = () => {
    const params: Record<string, string> = {};

    if (genres) {
      params.genres = genres;
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("input")
      ) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("title");
        setSearchParams(newParams);
      }

      const searchButton = document.querySelector(
        `.${styles.customInputMobile}`
      );
      const searchContainer = document.querySelector(`.${styles.customInput}`);
      if (
        searchMobileVisible &&
        !searchButton?.contains(event.target as HTMLElement) &&
        !searchContainer?.contains(event.target as HTMLElement)
      ) {
        setSearchMobileVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchParams, setSearchParams, searchMobileVisible]);

  function handleSearchVisibleMobile() {
    setSearchMobileVisible((prev) => !prev);
  }

  return (
    <>
      <div
        className={`${styles.customInput} ${
          searchMobileVisible ? styles["active"] : styles["hidden"]
        }`}
      >
        <input
          className={styles.customInput__field}
          type={type}
          aria-label={label}
          value={search}
          placeholder={placeholder}
          onChange={searchTap}
        />
        <SearchIcon
          aria-label="Сбросить поиск"
          className={`${styles.customInput__icon} ${
            search !== "" ? styles.customInput__fill : ""
          }`}
        />
        <Button
          type="reset"
          title={null}
          variant="reset"
          size="small"
          visible={search !== ""}
          onClick={handleDeleteSearchValue}
        />
        {search && (
          <div ref={searchRef}>
            {isLoading && (
              <ul className={styles.search__block}>
                <li className={styles.search__blockItem}>
                  <ClipLoader color="#dc5dfc" size={46} />
                </li>
              </ul>
            )}
            {isError && (
              <ul className={styles.search__block}>
                <li className={styles.search__blockItem}>
                  Произошла ошибка при поиске
                </li>
              </ul>
            )}
            {data && data.length === 0 && (
              <ul className={styles.search__block}>
                <li className={styles.search__blockItem}>Ничего не найдено</li>
              </ul>
            )}
            {data && data.length > 0 && (
              <ul className={styles.search__block}>
                {data.map((movie) => (
                  <li key={movie.id} className={styles.search__blockItem}>
                    <Link
                      onClick={handleSearchVisibleMobile}
                      to={`/movie/${movie.id}`}
                      className={styles.search__blockLink}
                    >
                      <div className={styles.search__blockCard}>
                        <img
                          className={styles.search__blockImage}
                          src={
                            movie.posterUrl !== null
                              ? movie.posterUrl
                              : "/src/assets/images/emptyPoster/empty-poster.png"
                          }
                          alt={`Постер к фильму: ${movie.title}`}
                        />
                        <div className={styles.search__blockInfo}>
                          <div className={styles.search__blockInfoSecondary}>
                            <span
                              className={
                                Number(movie.tmdbRating.toFixed(1)) >= 8.6
                                  ? `${styles.search__blockInfoRating} ${styles.search__blockInfoRatingGold}`
                                  : Number(movie.tmdbRating.toFixed(1)) >= 7.5
                                  ? `${styles.search__blockInfoRating} ${styles.search__blockInfoRatingGreen}`
                                  : Number(movie.tmdbRating.toFixed(1)) >= 6.3
                                  ? `${styles.search__blockInfoRating} ${styles.search__blockInfoRatingGray}`
                                  : Number(movie.tmdbRating.toFixed(1)) > 0.0
                                  ? `${styles.search__blockInfoRating} ${styles.search__blockInfoRatingRed}`
                                  : `${styles.search__blockInfoRating} ${styles.search__blockInfoRatingWhite}`
                              }
                            >
                              <StarIcon
                                className={styles.search__blockInfoIcon}
                              />
                              <span className={styles.search__blockInfoText}>
                                {movie.tmdbRating.toFixed(1)}
                              </span>
                            </span>
                            <span className={styles.search__blockInfoYear}>
                              {movie.releaseDate?.split("-")[0]}
                            </span>
                            {movie.genres.length > 0 && (
                              <span className={styles.search__blockInfoGenres}>
                                {movie.genres.join(", ")}
                              </span>
                            )}
                            <span className={styles.search__blockInfoTime}>
                              {`${Math.floor(movie.runtime / 60)} ч ${
                                movie.runtime % 60
                              } мин`}
                            </span>
                          </div>
                          <h2 className={styles.search__blockInfoTitle}>
                            {movie.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className={styles.customInputMobile}>
        <Button
          title={
            <SearchMobileIcon className={styles.customInputMobile__icon} />
          }
          size="small"
          onClick={handleSearchVisibleMobile}
        />
      </div>
    </>
  );
};

export default Search;
