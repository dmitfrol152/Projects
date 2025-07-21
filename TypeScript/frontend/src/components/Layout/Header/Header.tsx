import styles from "./Header.module.scss";
import IconSearch from "../../../assets/images/svg/icon-search.svg?react";
import { Logo } from "../../Logo";
import { Search } from "../../Search";
import { Account } from "../../Account";
import { useDispatch, useSelector } from "react-redux";
import type { valueSearchProps } from "./types";
import { searchAction } from "../../../store/searchSlice";

export const Header = () => {
  const value = useSelector(
    (state: valueSearchProps) => state.searchName.searchValue
  );
  const dispatch = useDispatch();

  function handleDeleteSearchValue() {
    dispatch(searchAction({ searchValue: "" }));
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Logo />
          <Search
            icon={IconSearch}
            type="text"
            label="Поиск трека"
            placeholder="Что будем искать?"
            name="search"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(searchAction({ searchValue: e.target.value }))
            }
            onClick={() => handleDeleteSearchValue()}
          />
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Header;
