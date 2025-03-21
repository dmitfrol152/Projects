import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MainPage } from "../MainPage";

it("Snapshot test for MainPage", () => {
  const { container } = renderComponent();

  const titleElement = screen.queryByTestId("heading-element");
  const descriptionElement = screen.getAllByRole("paragraph");

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toHaveLength(3);

  expect(container).toMatchSnapshot();
});

const renderComponent = () => {
  return render(<MainPage />);
};
