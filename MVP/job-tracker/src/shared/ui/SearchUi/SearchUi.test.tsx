import { fireEvent, render, screen } from "@testing-library/react";
import { SearchUi } from "./SearchUi";
import "@testing-library/jest-dom";

describe("test SearchUi component", () => {
  it("have a placeholder text", () => {
    render(
      <SearchUi
        placeholder="Search by position or company..."
        value=""
        setQuery={jest.fn}
      />
    );

    const placeholderText = screen.getByPlaceholderText(
      "Search by position or company..."
    );

    expect(placeholderText).toBeInTheDocument();
  });
  it("have a value", () => {
    render(
      <SearchUi
        placeholder="Search by position or company..."
        value="test"
        setQuery={jest.fn()}
      />
    );
    const inputFined = screen.getByDisplayValue('test');
    expect(inputFined).toBeInTheDocument();
  });
  it("trigger seTValue", () => {
    const setValueMock = jest.fn();

    render(
      <SearchUi
        placeholder="Search by position or company..."
        value=""
        setQuery={setValueMock}
      />
    );

    const inputfined = screen.getByPlaceholderText(
      "Search by position or company..."
    );

    fireEvent.change(inputfined, { target: { value: "new" } });

    expect(setValueMock).toHaveBeenCalledWith("new");
  });
});
