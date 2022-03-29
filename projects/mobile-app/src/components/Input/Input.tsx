import React, { FC, useState } from "react";
import { Capacitor } from "@capacitor/core";
import cx from "classnames";
import Label from "components/Label/Label";
import { useTranslation } from "react-i18next";
import { Message } from "../Message/Message";
import "./styles.scss";

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  /** Set a jsx element after or before the input */
  append?: JSX.Element;
  ariaLabel?: string;
  prepend?: JSX.Element;
  /** Show error styling */
  hasError?: boolean;
  /** Set the input as disabled */
  isDisabled?: boolean;
  /** Set the placeholder string */
  placeholder?: string;
  /** Sets the input to type "password" and will add a show/hide toggle */
  isSecure?: boolean;
  type?: string;
  name?: string;
  value?: string | number;
  readonly?: boolean;
  register: RefReturn;
  label?: string;
  errorMessage?: string;
  maxLength?: number;
  ariaLabelValue?: string;
  inputMode?: string;
};

const isAndroid = Capacitor.getPlatform() === "android";

export const inputBaseClasses =
  "text-white placeholder-white-faded w-full rounded-lg bg-transparent text-md sm:text-xl outline-none border-none focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder-transparent";
export const wrapperBaseClasses =
  "py-0 w-full flex items-center rounded-lg select-none bg-blue border-white border-2 border-solid outline-none";

export const Input: FC<InputProps> = ({
  append,
  ariaLabel,
  prepend,
  label,
  inputMode,
  hasError = false,
  isDisabled = false,
  placeholder,
  register,
  type = "text",
  value,
  name,
  isSecure,
  readOnly,
  className,
  errorMessage,
  maxLength,
  ariaLabelValue,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = cx(
    wrapperBaseClasses,
    isDisabled ? "disabled" : "",
    append ? "pr-4" : "",
    prepend ? "pl-4 " : "",
    hasError ? "border-red" : "",
    errorMessage ? "mb-2" : "",
    className
  );

  const [showText, setShowText] = useState(false);

  const textHidden = isSecure && !showText;
  const inputType = textHidden && !isAndroid ? "password" : type;

  const inputClasses = cx(inputBaseClasses, { "input-secure": textHidden && isAndroid });

  return (
    <div className="mb-2">
      {label && <LabelContainer ariaLabel={ariaLabel && `${ariaLabel}_LABEL`} label={label} />}
      {/* Note this label is purposefully not directly on the input b/c it will get swallowed by Android */}
      <div className={classes} aria-label={ariaLabelValue && `${ariaLabelValue}_FIELD`}>
        {!!prepend && <StyleInjector>{prepend}</StyleInjector>}
        <input
          className={inputClasses}
          placeholder={placeholder}
          type={inputType}
          ref={register}
          inputMode={inputMode}
          name={name}
          maxLength={maxLength}
          value={value}
          style={{ height: 48, fontSize: 20 }}
          readOnly={readOnly}
          {...rest}
        />
        {!!append && <StyleInjector>{append}</StyleInjector>}
        {isSecure && (
          <StyleInjector>
            <div
              aria-label={ariaLabel && `${ariaLabel}_SHOW_INPUT`}
              onClick={() => setShowText(!showText)}
              className="text-xs mr-2">
              {showText ? t("input.hide") : t("input.show")}
            </div>
          </StyleInjector>
        )}
      </div>
      {errorMessage && (
        <div>
          <Message ariaLabel={ariaLabel && `${ariaLabel}ALERT_LABEL`} variant="error">
            {errorMessage}
          </Message>
        </div>
      )}
    </div>
  );
};

export default Input;

Input.displayName = "Input";

export const LabelContainer: FC<{ label: string; ariaLabel?: string }> = ({ label, ariaLabel }) => (
  <div className="ml-2">
    <Label ariaLabel={ariaLabel}>{label}</Label>
  </div>
);

const StyleInjector: React.FC = ({ children }) => (
  <div className="max-h-8 flex" style={{ maxWidth: "3.5rem" }}>
    {children}
  </div>
);
