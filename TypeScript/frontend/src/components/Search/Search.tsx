import type { FC } from "react";
import type { SearchProps } from "./types";
import styles from "./Search.module.scss";
import IconClose from "../../assets/images/svg/icon-close.svg?react";

export const Search: FC<SearchProps> = ({
  icon: IconSearch,
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.search__field}
        type={type}
        placeholder={placeholder}
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
      <IconSearch className={styles.search__icon} />
      {value !== "" && (
        <IconClose className={styles.search__close} onClick={onClick} />
      )}
    </div>
  );
};

export default Search;
