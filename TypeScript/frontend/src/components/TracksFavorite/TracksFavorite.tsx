import type { FC } from "react";
import type { DataProps } from "./types";
import styles from "./TracksFavorite.module.scss";
import IconCalendar from "../../assets/images/svg/icon-calendar.svg?react";
import IconClock from "../../assets/images/svg/icon-clock.svg?react";
import { TableRow } from "../TableRow";

export const TracksFavorite: FC<DataProps> = ({ data }) => {
  return (
    <div className={styles.tracksFavorite}>
      <table className={styles.tracksFavorite__table}>
        <caption className={styles.tracksFavorite__tableTitle}>
          Избранное
        </caption>
        {data?.length === 0 ? (
          <p>Пока здесь пусто</p>
        ) : (
          <>
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
                return <TableRow key={track.id} track={track} index={index} />;
              })}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default TracksFavorite;
