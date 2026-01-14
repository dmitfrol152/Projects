import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";

jest.mock("@/assets/svg/logo.svg?react", () => {
  return jest.fn(() => <div data-testid="base-logo"></div>);
});
jest.mock("@shared/assets/png/avatar-empty.png", () => "empty-avatar.png");

describe("test LogoUi component", () => {
  it("if no user", () => {
    render(<Logo user={null} />);

    const iconFined = screen.getByTestId("base-logo");
    const textLogoFinded = screen.getByText("Job Tracker");

    expect(iconFined).toBeInTheDocument();
    expect(textLogoFinded).toBeInTheDocument();
  });
  it("if have user and have avatar", () => {
    const userMock = {
      id: "",
      app_metadata: {
        "": "",
      },
      user_metadata: {
        "": "",
      },
      aud: "",
      created_at: "",
    };

    render(<Logo user={userMock} profileSrc="avatar.png" />);

    const imgFined = screen.getByRole("img");

    expect(imgFined).toBeInTheDocument();
    expect(imgFined).toHaveAttribute("src", "avatar.png");
  });
  it("if have user and not have avatar", () => {
    const userMock = {
      id: "",
      app_metadata: {
        "": "",
      },
      user_metadata: {
        "": "",
      },
      aud: "",
      created_at: "",
    };

    render(<Logo user={userMock} profileSrc="" />);

    const imgFined = screen.getByRole("img");

    expect(imgFined).toBeInTheDocument();
    expect(imgFined).toHaveAttribute("src", "empty-avatar.png");
  });
});
