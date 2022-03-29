import React, { FC, useState, useMemo, useCallback, useRef, useEffect } from "react";

import { Button } from "../Button/Button";

const BackspaceIcon = () => (
  <svg width="31" height="24" xmlns="http://www.w3.org/2000/svg" data-testid="backspace-icon">
    <path
      d="M29.17 0c.558 0 1.01.452 1.01 1.01v21.571a1.011 1.011 0 01-1.01 1.011H8.702a1.01 1.01 0 01-.823-.424L.188 12.382a1.01 1.01 0 010-1.173L7.88.424A1.01 1.01 0 018.703 0H29.17zm-1.01 2.021H9.222l-6.968 9.775 6.968 9.775H28.16V2.021zm-6.653 4.512l.103.001c.212.015.41.11.557.263l.58.58a.855.855 0 01.263.557.684.684 0 01-.213.553l-3.306 3.306 3.306 3.306c.151.142.23.346.213.553a.854.854 0 01-.263.557l-.58.58a.856.856 0 01-.557.263.683.683 0 01-.553-.213l-3.306-3.306-3.306 3.306a.683.683 0 01-.553.213.854.854 0 01-.557-.263l-.58-.58a.855.855 0 01-.263-.557.684.684 0 01.213-.553l3.306-3.306-3.306-3.305a.683.683 0 01-.213-.553.855.855 0 01.263-.558l.58-.58a.855.855 0 01.557-.263.684.684 0 01.553.213l3.306 3.306 3.306-3.306a.684.684 0 01.553-.213z"
      className="fill-current"
      fillRule="nonzero"
    />
  </svg>
);

type CalculatorVariant = "integer" | "decimal";

const BUTTONS = {
  integer: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "backspace", "0"],
  decimal: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"],
};

export interface CalculatorProps {
  /** Respond to value change */
  onChange?: (value: string) => void;
  resetRef?: React.MutableRefObject<(value: string) => void>;
  /** Respond to enter click */
  onSubmit?: (value: string) => void;
  limit?: number;
  variant?: CalculatorVariant;
  maxDecimalScale?: number;
  ariaLabel?: string;
}

export const Calculator: FC<CalculatorProps> = ({
  onChange,
  onSubmit,
  limit,
  resetRef,
  variant = "integer",
  maxDecimalScale = Infinity,
  ariaLabel,
  ...rest
}) => {
  const [value, setValue] = useState("");

  const shouldUpdateDecimalNumber = useCallback(
    (pressedKey: string) => {
      const isEmpty = value === "";
      const startsWithZero = value.startsWith("0");
      const hasDecimalPoint = value.includes(".");

      if (pressedKey === "." && (hasDecimalPoint || isEmpty)) {
        return false;
      }

      if (pressedKey === "0" && !hasDecimalPoint && startsWithZero) {
        return false;
      }

      if (hasDecimalPoint && value.split(".")[1].length >= maxDecimalScale) {
        return false;
      }

      return true;
    },
    [value, maxDecimalScale]
  );

  const onClickHandler = useCallback(
    (button: string) => {
      let newValue = value + button;

      if (variant === "decimal" && !shouldUpdateDecimalNumber(button)) {
        return;
      }

      if (value === "0" && button !== ".") {
        newValue = button;
      }

      if (limit && parseInt(newValue, 10) / 100 > limit) return;

      setValue(newValue);
      onChange?.(newValue);
    },
    [limit, onChange, value, variant, shouldUpdateDecimalNumber]
  );

  const onBackspaceHandler = useCallback(() => {
    const newValue = value.slice(0, -1);

    setValue(newValue);
    onChange?.(newValue);
  }, [onChange, value]);

  const onSubmitHandler = useCallback(() => {
    onSubmit?.(value);
  }, [onSubmit, value]);

  const clickRef = useRef<(button: string) => void>();
  const backspaceRef = useRef<() => void>();

  useEffect(() => {
    if (resetRef) {
      // eslint-disable-next-line no-param-reassign
      resetRef.current = (newValue: string) => {
        setValue(newValue || "0");
      };
    }

    // prevent unmount errors
    return () => {
      if (resetRef) {
        // eslint-disable-next-line no-param-reassign
        resetRef.current = () => null;
      }
    };
  }, [resetRef]);

  // Use refs so we're not rebuilding the buttons
  // on each change. This may be overkill
  clickRef.current = onClickHandler;
  backspaceRef.current = onBackspaceHandler;

  const buttons = useMemo(
    () =>
      BUTTONS[variant].map((button) => {
        const isBackspace = button === "backspace";
        const string = isBackspace ? <BackspaceIcon /> : button;

        return (
          <Button
            className="h-14"
            key={button}
            ariaLabel={ariaLabel && `${ariaLabel}_${button === "." ? "DOT" : button.toUpperCase()}_BUTTON`}
            testId={`calculator-button-${button}`}
            onClick={() => {
              if (isBackspace) {
                backspaceRef.current?.();
              } else {
                clickRef.current?.(button);
              }
            }}
            variant="outline">
            {string}
          </Button>
        );
      }),
    [ariaLabel, variant]
  );

  return (
    <div className="grid w-full grid-cols-3 gap-2" {...rest}>
      {buttons}
      {variant === "integer" && (
        <Button variant="square" onClick={onSubmitHandler}>
          Enter
        </Button>
      )}
    </div>
  );
};

Calculator.displayName = "Calculator";
