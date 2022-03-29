import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  describe("Integer variant", () => {
    it("should have all the correct keys", () => {
      const { getByText, getByTestId } = render(<Calculator variant="integer" />);
      expect(getByText("0")).toBeInTheDocument();
      expect(getByText("1")).toBeInTheDocument();
      expect(getByText("2")).toBeInTheDocument();
      expect(getByText("3")).toBeInTheDocument();
      expect(getByText("4")).toBeInTheDocument();
      expect(getByText("5")).toBeInTheDocument();
      expect(getByText("6")).toBeInTheDocument();
      expect(getByText("7")).toBeInTheDocument();
      expect(getByText("8")).toBeInTheDocument();
      expect(getByText("9")).toBeInTheDocument();
      expect(getByText("Enter")).toBeInTheDocument();
      expect(getByTestId("backspace-icon")).toBeInTheDocument();
    });

    it("should call onChange on every key press", () => {
      const onChange = jest.fn();
      const { getByText, getByTestId } = render(<Calculator variant="integer" onChange={onChange} />);

      userEvent.click(getByText("1"));
      expect(onChange).toBeCalledWith("1");

      userEvent.click(getByText("2"));
      expect(onChange).toBeCalledWith("12");

      userEvent.click(getByText("3"));
      expect(onChange).toBeCalledWith("123");

      userEvent.click(getByText("4"));
      expect(onChange).toBeCalledWith("1234");

      userEvent.click(getByText("5"));
      expect(onChange).toBeCalledWith("12345");

      userEvent.click(getByText("6"));
      expect(onChange).toBeCalledWith("123456");

      userEvent.click(getByText("7"));
      expect(onChange).toBeCalledWith("1234567");

      userEvent.click(getByText("8"));
      expect(onChange).toBeCalledWith("12345678");

      userEvent.click(getByText("9"));
      expect(onChange).toBeCalledWith("123456789");

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledWith("1234567890");

      userEvent.click(getByTestId("backspace-icon"));
      expect(onChange).toBeCalledWith("123456789");
    });

    it("should call onSubmit with the final value when clicking Enter", () => {
      const onSubmit = jest.fn();
      const { getByText } = render(<Calculator variant="integer" onSubmit={onSubmit} />);

      userEvent.click(getByText("1"));
      userEvent.click(getByText("2"));
      userEvent.click(getByText("3"));

      userEvent.click(getByText("Enter"));
      expect(onSubmit).toBeCalledWith("123");
    });
  });

  describe("Decimal variant", () => {
    it("should have all the correct keys", () => {
      const { getByText, getByTestId } = render(<Calculator variant="decimal" />);
      expect(getByText("0")).toBeInTheDocument();
      expect(getByText("1")).toBeInTheDocument();
      expect(getByText("2")).toBeInTheDocument();
      expect(getByText("3")).toBeInTheDocument();
      expect(getByText("4")).toBeInTheDocument();
      expect(getByText("5")).toBeInTheDocument();
      expect(getByText("6")).toBeInTheDocument();
      expect(getByText("7")).toBeInTheDocument();
      expect(getByText("8")).toBeInTheDocument();
      expect(getByText("9")).toBeInTheDocument();
      expect(getByText(".")).toBeInTheDocument();
      expect(getByTestId("backspace-icon")).toBeInTheDocument();
    });

    it("should call onChange on every key press", () => {
      const onChange = jest.fn();
      const { getByText, getByTestId } = render(<Calculator variant="decimal" onChange={onChange} />);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledWith("0");

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledWith("0.");

      userEvent.click(getByText("1"));
      expect(onChange).toBeCalledWith("0.1");

      userEvent.click(getByText("2"));
      expect(onChange).toBeCalledWith("0.12");

      userEvent.click(getByText("3"));
      expect(onChange).toBeCalledWith("0.123");

      userEvent.click(getByText("4"));
      expect(onChange).toBeCalledWith("0.1234");

      userEvent.click(getByText("5"));
      expect(onChange).toBeCalledWith("0.12345");

      userEvent.click(getByText("6"));
      expect(onChange).toBeCalledWith("0.123456");

      userEvent.click(getByText("7"));
      expect(onChange).toBeCalledWith("0.1234567");

      userEvent.click(getByText("8"));
      expect(onChange).toBeCalledWith("0.12345678");

      userEvent.click(getByText("9"));
      expect(onChange).toBeCalledWith("0.123456789");

      userEvent.click(getByTestId("backspace-icon"));
      expect(onChange).toBeCalledWith("0.12345678");
    });

    it("should not call onChange when trying to input only zeroes before decimal point", () => {
      const onChange = jest.fn();
      const { getByText } = render(<Calculator variant="decimal" onChange={onChange} />);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledTimes(1);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledTimes(1);

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledTimes(2);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledTimes(3);
    });

    it("should not call onChange when trying to input more than one decimal point", () => {
      const onChange = jest.fn();
      const { getByText } = render(<Calculator variant="decimal" onChange={onChange} />);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith("0");

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith("0.");

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledTimes(2);
    });

    it("should not call onChange when trying to input the decimal point as the first digit", () => {
      const onChange = jest.fn();
      const { getByText } = render(<Calculator variant="decimal" onChange={onChange} />);

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledTimes(0);

      userEvent.click(getByText("0"));
      expect(onChange).toBeCalledTimes(1);

      userEvent.click(getByText("."));
      expect(onChange).toBeCalledTimes(2);
    });

    it("should not allow leading zeroes for the integer part", () => {
      const onChange = jest.fn();
      const { getByText } = render(<Calculator variant="decimal" onChange={onChange} />);

      userEvent.click(getByText("0"));
      // we don't know if this is a leading zero or the integer
      // part of a decimal number, so we should let it pass.
      expect(onChange).toBeCalledWith("0");

      userEvent.click(getByText("8"));
      // now we know it was just a leading zero, so we
      // should replace it by the current pressed digit
      expect(onChange).toBeCalledWith("8");
    });
  });
});
