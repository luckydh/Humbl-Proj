import React from "react";
import cx from "classnames";

interface Props {
  text?: string;
  prepend?: string;
  append?: string;
  onClick?: () => any;
  focused?: boolean;
  disabled?: boolean;
  bordered?: boolean;
}

export const CurrencyInput: React.FC<Props> = ({
  text,
  prepend,
  append,
  onClick,
  focused = false,
  disabled = false,
  bordered = true,
  ...rest
}) => {
  const divClasses = cx(
    "w-full flex items-center rounded-lg border-2 outline-none",
    focused ? "border-blue-white" : "",
    bordered ? "border-white" : "border-transparent"
  );
  const textClasses = cx(
    "text-white w-full text-xl font-medium flex items-center",
    disabled && !focused ? "opacity-50" : ""
  );
  return (
    <div onClick={onClick} style={{ height: 60 }} className={divClasses} {...rest}>
      {prepend && <span className="text-white text-xl ml-3 mr-2">{prepend}</span>}
      <span className={textClasses}>{text}</span>
      {append && <span className="text-white text-xl mx-3 font-semibold">{append}</span>}
    </div>
  );
};
