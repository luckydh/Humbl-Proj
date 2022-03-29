import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextField } from "./TextField";
import { ONTOP_STYLES as LABEL_ONTOP_STYLES } from "../Label/styles";

describe("TextField component", () => {
  it("should render all components", () => {
    const { getByText, getByLabelText } = render(<TextField label="Label" id="input" helperText="Helper text" />);

    expect(getByText("Label")).toBeInTheDocument();
    expect(getByLabelText("Label")).toBeInTheDocument();
    expect(getByText("Helper text")).toBeInTheDocument();
  });

  it("should allow entering a text value", () => {
    const { getByLabelText } = render(<TextField label="Label" id="input" />);

    const input = getByLabelText("Label");

    userEvent.type(input, "text");
    expect(input).toHaveValue("text");
  });

  it("should render the placeholder only when input is focused", () => {
    const { getByLabelText, queryByPlaceholderText } = render(
      <TextField label="Label" id="input" placeholder="Placeholder" />
    );

    expect(queryByPlaceholderText("Placeholder")).not.toBeInTheDocument();

    userEvent.click(getByLabelText("Label"));

    expect(queryByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("should place the label on top when input is focused", () => {
    const { getByText, getByLabelText } = render(<TextField label="Label" id="input" />);

    // click the input to focus
    userEvent.click(getByLabelText("Label"));
    expect(getByText("Label")).toHaveClass(LABEL_ONTOP_STYLES);

    // click anywhere to remove focus
    userEvent.click(document.body);
    expect(getByText("Label")).not.toHaveClass(LABEL_ONTOP_STYLES);
  });

  it("should place the label on top when input has value", () => {
    const { getByText, getByLabelText } = render(<TextField label="Label" id="input" value="test" />);

    expect(getByText("Label")).toHaveClass(LABEL_ONTOP_STYLES);

    // clear the value and remove focus
    userEvent.clear(getByLabelText("Label"));
    userEvent.click(document.body);
    expect(getByText("Label")).not.toHaveClass(LABEL_ONTOP_STYLES);
  });

  it("should place the label on top if input has a default value", () => {
    const { getByText, getByLabelText } = render(<TextField label="Label" id="input" defaultValue="test" />);

    expect(getByText("Label")).toHaveClass(LABEL_ONTOP_STYLES);

    // clear the value and remove focus
    userEvent.clear(getByLabelText("Label"));
    userEvent.click(document.body);
    expect(getByText("Label")).not.toHaveClass(LABEL_ONTOP_STYLES);
  });
});
