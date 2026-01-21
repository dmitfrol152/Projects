import { OPTIONS } from "@/shared/lib/constants/options";
import i18n from "@shared/i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import { SelectUi } from "./SelectUi";
import "@testing-library/jest-dom";

beforeAll(() => i18n.changeLanguage("en"));

describe("test SelectUi component", () => {
  it("render label", () => {
    render(
      <SelectUi label="Test" options={OPTIONS} value="" translation="dashboard" />
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  it("all options", () => {
    render(<SelectUi options={OPTIONS} value="" translation="dashboard" />);

    expect(screen.getByText("Applied")).toBeInTheDocument();
    expect(screen.getByText("Interview")).toBeInTheDocument();
    expect(screen.getByText("Offer")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.getByText("Wishlist")).toBeInTheDocument();
  });
  it("first disabled", () => {
    render(<SelectUi options={OPTIONS} translation="dashboard" />);

    const firstOption = screen.getByText(
      "-- Status by --"
    ) as HTMLOptionElement;
    expect(firstOption.disabled).toBe(true);
  });
  it("setValue", () => {
    const setValueMock = jest.fn();

    render(<SelectUi options={OPTIONS} setValue={setValueMock} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "offer" } });

    expect(setValueMock).toHaveBeenCalledWith("offer");
  });
  it("error", () => {
    render(<SelectUi options={OPTIONS} error="error" />);

    expect(screen.getByText("error")).toBeInTheDocument();
  });
  it("error className active if error", () => {
    render(<SelectUi options={OPTIONS} error="error" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass(
      "border p-2 rounded text-[var(--color-black)] min-h-10.5 border-[var(--color-danger)] focus:border-[var(--color-danger)] hover:border-[var(--color-danger)]"
    );
  });
});
