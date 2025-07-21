import type { FC } from "react";
import type { DataProps } from "./types";
import styles from "./Tracks.module.scss";
import IconCalendar from "../../assets/images/svg/icon-calendar.svg?react";
import IconClock from "../../assets/images/svg/icon-clock.svg?react";
import { TableRow } from "../TableRow";

export const Tracks: FC<DataProps> = ({ data }) => {
  return (
    <div className={styles.tracks}>
      <table className={styles.tracks__table}>
        <caption className={styles.tracks__tableTitle}>
          Аудифайлы и треки
        </caption>
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Альбом</th>
            <th>{<IconCalendar className={styles.tracks__tableSvg} />}</th>
            <th>{<IconClock className={styles.tracks__tableSvg} />}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((track, index) => {
            return <TableRow key={track.id} track={track} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tracks;
