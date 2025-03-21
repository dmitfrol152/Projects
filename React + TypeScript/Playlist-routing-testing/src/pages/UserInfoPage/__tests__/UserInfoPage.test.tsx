import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserInfoPage } from "../UserInfoPage";
import "@testing-library/jest-dom";
import { USERS } from "../../../data";

describe("Testing UserInfoPage.test", () => {
  it("Testing non-existent page", () => {
    render(
      <MemoryRouter initialEntries={["/users/777"]}>
        <Routes>
          <Route path={"/users/:userId"} element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Пользователя с таким userId нет/i)
    ).toBeInTheDocument();
  });

  it("Testing existent page", () => {
    const number = 2;
    const users = USERS[number];
    render(
      <MemoryRouter initialEntries={[`/users/${number}`]}>
        <Routes>
          <Route path={"/users/:userId"} element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(`${users.email}`)).toBeInTheDocument();
    expect(screen.getByText(`${users.fullName}`)).toBeInTheDocument();

    if (users.playlist?.name) {
      expect(
        screen.getByRole("link", { name: users.playlist?.name })
      ).toBeInTheDocument();
    }
  });
});
