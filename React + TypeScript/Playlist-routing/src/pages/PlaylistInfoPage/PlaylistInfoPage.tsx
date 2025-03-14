import { NavLink, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./playlistInfoPage.css";

export const PlaylistInfoPage = () => {
  const { playlistsId } = useParams();
  const playlist = PLAYLISTS[Number(playlistsId)];

  if (!playlist) {
    return (
      <div className="playlistInfoPage">
        <h2>PlaylistInfoPage</h2>

        <div className="playlist">
          <p>Плейлсита с таким playlistId не существует</p>
        </div>
      </div>
    );
  }

  return (
    <div className="playlistInfoPage">
      <h2>PlaylistInfoPage</h2>

      <div className="playlistInfoPage__inner">
        <p className="playlistInfoPage__description">
          <NavLink
            to={`/playlists?searchGenre=${playlist.genre.toLowerCase()}`}
          >
            Жанр: <b>{playlist.genre}</b>
          </NavLink>
        </p>
        <p className="playlistInfoPage__description playlistInfoPage__description--last">
          Название: <b>{playlist.name}</b>
        </p>
        <ul className="playlistInfoPage__list">
          {playlist.songs.map((song) => {
            return <li key={playlist.id}>- {song}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
