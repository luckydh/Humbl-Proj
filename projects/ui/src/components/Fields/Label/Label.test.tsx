import { render } from "@testing-library/react";

import { Label } from "./Label";
import { INSIDE_STYLES, ONTOP_STYLES, variants } from "./styles";

describe("Label component", () => {
  it("should render the label in default position", () => {
    const { getByText } = render(<Label>Test</Label>);
    expect(getByText("Test")).toBeInTheDocument();
    expect(getByText("Test")).toHaveClass(INSIDE_STYLES);
  });

  it("should render the label on top", () => {
    const { getByText } = render(<Label onTop>Test</Label>);
    expect(getByText("Test")).toHaveClass(ONTOP_STYLES);
    expect(getByText("Test")).not.toHaveClass(INSIDE_STYLES);
  });

  it("should render default variant", () => {
    const { getByText } = render(
      <Label onTop variant="default">
        Test
      </Label>
    );
    expect(getByText("Test")).toHaveClass(variants.default);
  });

  it("should render error variant", () => {
    const { getByText } = render(
      <Label onTop variant="error">
        Test
      </Label>
    );
    expect(getByText("Test")).toHaveClass(variants.error);
  });

  it("should render success variant", () => {
    const { getByText } = render(
      <Label onTop variant="success">
        Test
      </Label>
    );
    expect(getByText("Test")).toHaveClass(variants.success);
  });
});
