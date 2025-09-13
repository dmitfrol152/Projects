export function GameLayout({
  backLinks,
  title,
  gameInfo,
  plyerInfo,
  gameMovieInfo,
  actions,
  gameCells,
  playerSelect,
  timerSelect,
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-2">
        {playerSelect}
        {timerSelect}
      </div>
      <div className="pl-2 mb-4">
        {backLinks}
        {title}
        {gameInfo}
      </div>
      <div className="bg-white rounded-2xl shadow-md py-4 px-8 grid grid-cols-2 gap-3 justify-between mb-6">
        {plyerInfo}
      </div>
      <div className="bg-white rounded-2xl shadow-md pt-5 pb-7 px-8 mb-4">
        <div className="flex items-center gap-2 justify-between mb-3">
          <div>{gameMovieInfo}</div>
          <div className="flex items-center gap-3">{actions}</div>
        </div>
        <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] -pl-px -pt-px">
          {gameCells}
        </div>
      </div>
    </div>
  );
}
