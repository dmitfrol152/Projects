import { NavLink, useSearchParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import { ChangeEvent } from "react";
import "./PlaylistsPage.css";

export const PlaylistsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchGenre = searchParams.get("searchGenre") || "";
  const searchName = searchParams.get("searchName") || "";

  const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    const params: { searchGenre?: string; searchName?: string } = {};

    if (value) {
      params.searchGenre = value.toLowerCase();
    }
    if (searchName) {
      params.searchName = searchName;
    }

    setSearchParams(params);
  };

  const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    const params: { searchGenre?: string; searchName?: string } = {};

    if (value) {
      params.searchName = value.toLowerCase();
    }
    if (searchGenre) {
      params.searchGenre = searchGenre;
    }

    setSearchParams(params);
  };

  const filtredPlaylists = PLAYLISTS.filter(
    ({ genre, name }) =>
      genre.toLowerCase().includes(searchGenre) &&
      name.toLowerCase().includes(searchName) &&
      name !== ""
  );

  return (
    <div className="playlistsPage">
      <h2>PlaylistsPage</h2>

      <div className="playlists">
        <label>
          введите жанр{" "}
          <input type="text" value={searchGenre} onChange={handleSearchGenre} />
        </label>
        <label>
          введите название{" "}
          <input type="text" value={searchName} onChange={handleSearchName} />
        </label>
        {filtredPlaylists.map(({ id, name }) => (
          <NavLink to={`/playlists/${id}`} key={id}>
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
