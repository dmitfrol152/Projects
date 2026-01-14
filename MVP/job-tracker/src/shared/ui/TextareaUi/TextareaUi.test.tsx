import { render, screen } from "@testing-library/react";
import { TextareaUi } from "./TextareaUi";
import "@testing-library/jest-dom";

describe("test TextareaUi component", () => {
  it("placeholder", () => {
    render(<TextareaUi placeholder="test" rows={3} />);

    const textarea = screen.getByPlaceholderText("test");
    expect(textarea).toBeInTheDocument();
  });
  it("lable", () => {
    render(<TextareaUi label="test" rows={3} placeholder="" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("rows", () => {
    render(<TextareaUi rows={3} placeholder="" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "3");
  });
  it("error", () => {
    render(<TextareaUi rows={3} error="test" placeholder="" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("error className error", () => {
    render(<TextareaUi placeholder="" error="test" rows={3} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass(
      "border-[var(--color-danger)] focus:border-[var(--color-danger)] hover:border-[var(--color-danger)]"
    );
  });
});
