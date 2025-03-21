import { render, screen, fireEvent } from "@testing-library/react";
import { UsersPage } from "../UsersPage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const mockSetSearchParams = jest.fn();
const mockSearchParams = new URLSearchParams({ serchName: "" });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

describe("Testing setSearchParam: users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Users input tasting", () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <UsersPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/введите имя/i)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });
    const listItems = screen.queryByRole("listitem");
    expect(listItems).toBeNull();

    fireEvent.change(input, { target: { value: "Abraham Walsh" } });
    expect(screen.getByText(/Abraham Walsh/i)).toBeInTheDocument();
  });

  it("Users setSearchParam testing", () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("test-container")).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { value: "Abraham Walsh" },
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      searchName: "abraham walsh",
    });
  });
});
