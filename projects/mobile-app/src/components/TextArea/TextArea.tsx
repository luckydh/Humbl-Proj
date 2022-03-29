import React, { FC } from "react";
import cx from "classnames";

type RefReturn =
  | string
  | ((instance: HTMLTextAreaElement | null) => void)
  | React.RefObject<HTMLTextAreaElement>
  | null
  | undefined;

export type TextAreaProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  hasError?: boolean;
  isDisabled?: boolean;
  register: RefReturn;
};

export const TextArea: FC<TextAreaProps> = (props) => {
  const { hasError = false, isDisabled = false, register, className, ...rest } = props;

  const classes = cx(
    "form-input py-0 w-full flex items-center rounded-lg select-none bg-none border-white border-2 outline-none",
    isDisabled ? "disabled" : "",
    hasError ? "border-red" : "",
    className
  );

  const textAreaClasses = cx(
    "text-white placeholder-white-faded w-full h-full bg-transparent text-xl outline-none border-none focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder-transparent resize-none"
  );

  return (
    <div className={classes} style={{ height: 180 }}>
      <textarea ref={register} className={textAreaClasses} {...rest} />
    </div>
  );
};

export default TextArea;

TextArea.displayName = "TextArea";
