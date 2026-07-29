import { render, screen } from "@testing-library/react";

import { userSelector } from "@/store/auth/selectors";

import DropdownMenuIcon from "../";

jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppSelector: jest.fn((selector) => selector()),
}));

const mockUser = {
  avatarUrl: "avatarUrl",
  firstName: "firstName",
  lastName: "lastName",
  userName: "userName",
};
jest.mock("@/store/auth/selectors", () => ({
  ...jest.requireActual("@/store/auth/selectors"),
  userSelector: jest.fn(() => mockUser),
}));

describe("DropdownMenuIcon", () => {
  describe("renders component", () => {
    const defaultProps = {};

    const renderComponent = (props = defaultProps) =>
      render(<DropdownMenuIcon {...props} />);

    it("with avatarUrl", () => {
      renderComponent();

      const avatar = screen.getByTestId("avatar");
      const image = avatar.querySelector("img");

      expect(avatar).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "avatarUrl");
    });

    it("without avatarUrl but with firstName and lastName", () => {
      userSelector.mockReturnValueOnce({ ...mockUser, avatarUrl: undefined });
      renderComponent();

      const avatar = screen.getByTestId("avatar");
      const image = avatar.querySelector("img");

      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("FL")).toBeInTheDocument();
      expect(image).not.toBeInTheDocument();
    });

    it("without avatarUrl, firstName and lastName", () => {
      userSelector.mockReturnValueOnce({
        ...mockUser,
        avatarUrl: undefined,
        firstName: undefined,
        lastName: undefined,
      });
      renderComponent();

      const avatar = screen.getByTestId("avatar");
      const image = avatar.querySelector("img");

      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("U")).toBeInTheDocument();
      expect(image).not.toBeInTheDocument();
    });
  });
});
