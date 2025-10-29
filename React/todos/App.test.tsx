import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./src/App";

describe("Testing TODOS", () => {
  it("Testing add new todo", () => {
    render(<App />);

    const input = screen.getByTestId("test-id");
    fireEvent.change(input, { target: { value: "dfdfd" } });
    fireEvent.submit(input);
    expect(screen.getByText("dfdfd")).toBeInTheDocument();
  });
});
