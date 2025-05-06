import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { PlaylistsPage } from "../PlaylistsPage";

const mockSearchParams = new URLSearchParams({
  searchName: "",
  searchGenre: "",
});
const setMockSearchParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [mockSearchParams, setMockSearchParams],
}));

describe("Testing setSearchParam: playlists", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Playlists setSearchParam testing", () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("test-container")).toBeInTheDocument();

    const inputName = screen.getByTestId("test-input-name");
    const inputGenre = screen.getByTestId("test-input-genre");

    fireEvent.change(inputName, { target: { value: "ga" } });
    fireEvent.change(inputGenre, { target: { value: "r" } });

    expect(screen.getByText(/Gansta Rapp/i)).toBeInTheDocument();

    expect(setMockSearchParams).toHaveBeenCalledWith({ searchName: "ga" });
    expect(setMockSearchParams).toHaveBeenCalledWith({ searchGenre: "r" });

    expect(setMockSearchParams).toHaveBeenCalledTimes(2);
  });
});
