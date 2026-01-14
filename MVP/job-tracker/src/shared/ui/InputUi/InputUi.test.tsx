import { fireEvent, render, screen } from "@testing-library/react";
import { InputUi } from "./InputUi";
import "@testing-library/jest-dom";

describe("test InputUi component", () => {
  it("label and placeholder", () => {
    const label = "Label";
    const placeholder = "Placeholder";

    render(<InputUi label={label} type="text" placeholder={placeholder} />);

    const labelFined = screen.getByLabelText(label);
    const placeholderFined = screen.getByPlaceholderText(placeholder);

    expect(labelFined).toBeInTheDocument();
    expect(placeholderFined).toBeInTheDocument();
    expect(labelFined).toHaveAttribute("type", "text");
  });
  it("have error", () => {
    const error = "Error";

    render(<InputUi type="text" error={error} />);

    const errorMessage = screen.getByText(error);

    expect(errorMessage).toBeInTheDocument();
  });
  it("trigger setValue", () => {
    const label = "Label";
    const setValueMock = jest.fn();

    render(
      <InputUi label={label} type="text" value="" setValue={setValueMock} />
    );

    const inputFined = screen.getByLabelText(label);

    fireEvent.change(inputFined, { target: { value: "new" } });

    expect(setValueMock).toHaveBeenCalledWith("new");
  });
  it("trigger onChange", () => {
    const label = "Label";
    const onChangeMock = jest.fn();

    render(
      <InputUi label={label} type="text" value="" onChange={onChangeMock} />
    );

    const inputFined = screen.getByLabelText(label);

    fireEvent.change(inputFined, { target: { value: "new" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
