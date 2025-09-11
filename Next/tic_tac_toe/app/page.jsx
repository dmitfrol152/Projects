import { Header } from "../components/header";
// import { UiTextField } from "../ui/fields/UiTextField";
import { Game } from "../components/game-new";

export default function HomePage() {
  return (
    <HomePageLayout header={<Header />}>
      <Game />
      {/* <UiTextField
        label="Label"
        placeholder="placeholder"
        requared
        helperText="helperText"
        errorText="errorText"
      /> */}
    </HomePageLayout>
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
