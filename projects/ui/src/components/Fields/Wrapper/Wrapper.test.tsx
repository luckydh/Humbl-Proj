import { render } from "@testing-library/react";

import { Wrapper } from "./Wrapper";
import { variants } from "./styles";

describe("FieldWrapper component", () => {
  it("should render the default variant", () => {
    const { container } = render(<Wrapper variant="default" />);

    expect(container.firstChild).toHaveClass(variants.default);
  });

  it("should render the error variant", () => {
    const { container } = render(<Wrapper variant="error" />);

    expect(container.firstChild).toHaveClass(variants.error);
  });

  it("should render the success variant", () => {
    const { container } = render(<Wrapper variant="success" />);

    expect(container.firstChild).toHaveClass(variants.success);
  });
});
