import type { FC } from "react";
import type { DataProps } from "./types";
import styles from "./TracksFavorite.module.scss";
import IconCalendar from "../../assets/images/svg/icon-calendar.svg?react";
import IconClock from "../../assets/images/svg/icon-clock.svg?react";
import { TableRow } from "../TableRow";

export const TracksFavorite: FC<DataProps> = ({
  data,
  openedModalId,
  setOpenedModalId,
}) => {
  return (
    <div className={styles.tracksFavorite}>
      {data?.length === 0 ? (
        <>
          <h2 className={styles.tracksFavorite__tableTitle}>Избранное</h2>
          <p>Пока здесь пусто</p>
        </>
      ) : (
        <table className={styles.tracksFavorite__table}>
          <caption className={styles.tracksFavorite__tableTitle}>
            Избранное
          </caption>
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Альбом</th>
              <th>
                {<IconCalendar className={styles.tracksFavorite__tableSvg} />}
              </th>
              <th>
                {<IconClock className={styles.tracksFavorite__tableSvg} />}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((track, index) => {
              const findedTrackInFavorite = data?.find(
                (trackFavorite) => trackFavorite.id === track.id
              );
              return (
                <TableRow
                  key={track.id}
                  track={track}
                  index={index}
                  inFavorite={findedTrackInFavorite ? true : false}
                  openedModalId={openedModalId}
                  setOpenedModalId={setOpenedModalId}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TracksFavorite;
