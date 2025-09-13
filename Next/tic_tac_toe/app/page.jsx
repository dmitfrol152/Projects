"use client";

import { Header } from "../components/header";
import { Game } from "../components/game-new";
import { GameProvider } from "../context/GameContext";

export default function HomePage() {
  return (
    <GameProvider>
      <HomePageLayout header={<Header />}>
        <Game />
      </HomePageLayout>
    </GameProvider>

  );
}

function HomePageLayout({ header, children }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {header}
      <main className="pt-6 mx-auto w-max">{children}</main>
    </div>
  );
}
