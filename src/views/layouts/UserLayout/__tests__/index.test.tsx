import { render, screen } from "@testing-library/react";

import fetchUser from "@/store/auth/operations/fetchUser";

import UserLayout from "../";

const mockDispatch = jest.fn();
jest.mock("@/store/hooks", () => ({
  ...jest.requireActual("@/store/hooks"),
  useAppDispatch: () => mockDispatch,
}));

jest.mock("@/store/auth/operations/fetchUser", () => ({
  __esModule: true,
  default: jest.fn(() => ({ type: "auth/fetchUser" })),
}));

jest.mock("@/views/layouts/headers/UserHeader", () => ({
  __esModule: true,
  default: () => <div data-testid="userHeader" />,
}));

jest.mock("@/views/shared/ModalRoot", () => ({
  __esModule: true,
  default: () => <div data-testid="modalRoot" />,
}));

describe("UserLayout", () => {
  describe("renders component", () => {
    const defaultProps = {
      children: <div data-testid="userLayoutContent">Content</div>,
    };

    const renderComponent = (props = defaultProps) =>
      render(<UserLayout {...props} />);

    beforeEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });

    it("with default props", () => {
      renderComponent();

      expect(screen.getByTestId("userHeader")).toBeInTheDocument();
      expect(screen.getByTestId("modalRoot")).toBeInTheDocument();
      expect(screen.getByTestId("userLayoutContent")).toHaveTextContent(
        "Content"
      );
    });

    it("dispatches fetchUser if token exists", () => {
      Storage.prototype.getItem = jest.fn(() => "token");

      renderComponent();

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetchUser).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({ type: "auth/fetchUser" });
    });

    it("does not dispatch fetchUser if token does not exist", () => {
      Storage.prototype.getItem = jest.fn(() => null);

      renderComponent();

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetchUser).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
