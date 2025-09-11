import { CloseIcon } from "../../app/assets/icons/CloseIcon";
import { ZeroIcon } from "../../app/assets/icons/ZeroIcon";
import { BoxIcon } from "../../app/assets/icons/BoxIcon";
import { TriangleIcon } from "../../app/assets/icons/TriangleIcon";
import { GAME_SYMBOLS } from "../../constants/symbols";

export function GameSymbol({ symbol, className }) {
  const Icon =
    {
      [GAME_SYMBOLS.CROSS]: CloseIcon,
      [GAME_SYMBOLS.BOX]: BoxIcon,
      [GAME_SYMBOLS.ZERO]: ZeroIcon,
      [GAME_SYMBOLS.TRIANGLE]: TriangleIcon,
    }[symbol] ?? CloseIcon;

  return <Icon className={className} />;
}
