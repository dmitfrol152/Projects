import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Router, { MemoryRouter } from "react-router-dom";
import { PlaylistInfoPage } from "../PlaylistInfoPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe("Testing PlayListInfoPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Testing non-existent page", () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ playlistsId: "100" });
    render(
      <MemoryRouter>
        <PlaylistInfoPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Плейлиста с таким playlistId не существует"));
  });

  it("Testing existent page", () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ playlistsId: "0" });
    render(
      <MemoryRouter>
        <PlaylistInfoPage />
      </MemoryRouter>
    );
    const genreEl = screen.getByRole("link", { name: /жанр: rock/i });
    expect(genreEl).toBeInTheDocument();
    const nameEl = screen.getByText(/название:/i);
    expect(nameEl).toBeInTheDocument();
    expect(nameEl.querySelector("b")).toHaveTextContent(/great rock hits/i);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(20);
  });
});

// const LocationComponent = () => {
//   const location = useLocation();
//   return <div data-testid={"location-pathname"}>{location.pathname}</div>;
// };

// describe("Testing PlayListInfoPage for contain current date", () => {
//   it("Testing empty date and current text", () => {
//     render(
//       <MemoryRouter initialEntries={["/playlists"]}>
//         <Routes>
//           <Route path="playlists" element={<PlaylistsPage />} />
//           <Route path="playlists/:playlistsId" element={<PlaylistInfoPage />} />
//         </Routes>
//         <LocationComponent />
//       </MemoryRouter>
//     );

//     const playlist = screen.getByText(/Great Rock Hits/i);
//     fireEvent.click(playlist);
//     expect(screen.getByTestId("playlists-page")).toBeInTheDocument();
//     const link = screen.getByRole("link", { name: /жанр: rock/i });
//     expect(link).toBeInTheDocument();
//     expect(screen.getByText(/Great Rock Hits/i)).toBeInTheDocument();
//     const playlistsList = screen.getAllByRole("listitem");
//     expect(playlistsList).toHaveLength(20);

//     expect(screen.getByTestId("location-pathname")).toHaveTextContent(
//       "/playlists/0"
//     );
//   });
// });
