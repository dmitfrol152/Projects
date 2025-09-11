import { StarIcon } from "../../../app/assets/icons/StarIcon";
import { ManIcon } from "../../../app/assets/icons/ManIcon";
import { TimeIcon } from "../../../app/assets/icons/TimeIcon";

export function GameInfo({ playerCount, isRatingGame, timeMode }) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      {isRatingGame && <StarIcon />}
      <span className="flex items-center gap-1">
        <ManIcon />
        {playerCount}
      </span>
      <span className="flex items-center gap-1">
        <TimeIcon /> {timeMode}
      </span>
    </div>
  );
}
