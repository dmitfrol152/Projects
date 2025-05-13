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
import emptyPoster from "../../assets/images/emptyPoster/empty-poster.png";
import useDebounce from "../../hooks/useDebounce";

export const Search: FC<ISearchProps> = ({ type, label, placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("title") || "");
  const debouncedSearchValue = useDebounce(inputValue, 500);
  const { data, isLoading, isError } = useSearchMovie();
  const [searchMobileVisible, setSearchMobileVisible] =
    useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const genres = searchParams.get("genres") || "";

  useEffect(() => {
    const params: Record<string, string> = {};

    if (genres) {
      params.genres = genres;
    }

    if (debouncedSearchValue) {
      params.title = debouncedSearchValue.toLowerCase();
    }

    setSearchParams(params, { replace: true });
  }, [debouncedSearchValue, genres, setSearchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("input")
      ) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("title");
        setSearchParams(newParams, { replace: true });
        setInputValue("");
        // const params: Record<string, string> = {};

        // if (genres) {
        //   params.genres = genres;
        // }

        // setSearchParams(params);
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
  }, [searchMobileVisible, searchParams, setSearchParams]);

  const searchTap = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDeleteSearchValue = () => {
    setInputValue("");
    const params: Record<string, string> = {};

    if (genres) {
      params.genres = genres;
    }

    setSearchParams(params);
  };

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
          value={inputValue}
          placeholder={placeholder}
          onChange={searchTap}
        />
        <SearchIcon
          aria-label="Сбросить поиск"
          className={`${styles.customInput__icon} ${
            inputValue !== "" ? styles.customInput__fill : ""
          }`}
        />
        <Button
          type="reset"
          title={null}
          variant="reset"
          size="small"
          visible={inputValue !== ""}
          onClick={handleDeleteSearchValue}
        />
        {inputValue && (
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
                      onClick={() => {
                        handleSearchVisibleMobile();
                        handleDeleteSearchValue();
                      }}
                      to={`/movie/${movie.id}`}
                      className={styles.search__blockLink}
                    >
                      <div className={styles.search__blockCard}>
                        <img
                          className={styles.search__blockImage}
                          src={
                            movie.posterUrl !== null
                              ? movie.posterUrl
                              : emptyPoster
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
