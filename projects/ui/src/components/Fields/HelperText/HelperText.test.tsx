import { render } from "@testing-library/react";

import { HelperText } from "./HelperText";
import { variants } from "./styles";

describe("Label component", () => {
  it("should render a helper text", () => {
    const { getByText } = render(<HelperText>Test</HelperText>);
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render the default variant", () => {
    const { getByText } = render(<HelperText variant="default">Test</HelperText>);
    expect(getByText("Test")).toHaveClass(variants.default);
  });

  it("should render the error variant", () => {
    const { getByText } = render(<HelperText variant="error">Test</HelperText>);
    expect(getByText("Test")).toHaveClass(variants.error);
  });

  it("should render the success variant", () => {
    const { getByText } = render(<HelperText variant="success">Test</HelperText>);
    expect(getByText("Test")).toHaveClass(variants.success);
  });
});
