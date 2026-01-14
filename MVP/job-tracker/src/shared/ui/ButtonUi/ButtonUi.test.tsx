import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonUi } from "../ButtonUi";
import "@testing-library/jest-dom";

describe("test ButtonUi component", () => {
  it("name button", () => {
    render(
      <ButtonUi size="md" variant="primary" type="button">
        Button
      </ButtonUi>
    );

    const button = screen.getByRole("button", { name: /Button/i });
    expect(button).toBeInTheDocument();
  });
  it("have a click at button", () => {
    const onClick = jest.fn();

    render(
      <ButtonUi
        size="md"
        variant="primary"
        type="button"
        handleClickButton={onClick}
      >
        Button
      </ButtonUi>
    );

    const button = screen.getByRole("button", { name: /Button/i });

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("have not a click at button (when disable)", () => {
    const onClick = jest.fn();

    render(
      <ButtonUi
        size="md"
        variant="primary"
        type="button"
        disabled
        handleClickButton={onClick}
      >
        Button
      </ButtonUi>
    );

    const button = screen.getByRole("button", { name: /Button/i });

    expect(onClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
