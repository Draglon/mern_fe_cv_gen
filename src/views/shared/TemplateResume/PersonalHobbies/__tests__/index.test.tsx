import { render, screen } from "@testing-library/react";

import PersonalHobbies, { HobbiesProps } from "../";

describe("PersonalHobbies", () => {
  describe("renders component", () => {
    const defaultProps: HobbiesProps = {
      templateLocale: "en",
      personalHobbies: {
        hobbies: {
          en: [
            {
              hobby: "Hobby 1",
            },
          ],
          ua: [],
          ru: [],
        },
      },
    };

    const renderComponent = (props = defaultProps) =>
      render(<PersonalHobbies {...props} />);

    it("with default props", () => {
      renderComponent();

      expect(screen.getByText("Hobby 1")).toBeInTheDocument();
    });
  });
});
