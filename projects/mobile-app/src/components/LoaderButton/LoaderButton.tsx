import React from "react";
import cx from "classnames";
import { IonSpinner } from "@ionic/react";
import { Transition } from "@headlessui/react";

type Variant = "default" | "outlined";

interface LoaderButtonBaseProps {
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset" | undefined;
  ariaLabel?: string;
}

export interface LoaderButtonTextProps extends LoaderButtonBaseProps {
  text: string;
  children?: never;
}

interface LoaderButtonWithChildrenProps extends LoaderButtonBaseProps {
  text?: never;
  children?: JSX.Element;
}

const VARIANTS: Record<Variant, string> = {
  default: "bg-blue-dark text-white",
  outlined: "bg-transparent text-blue-dark",
};

const LoaderButton: React.FC<LoaderButtonTextProps | LoaderButtonWithChildrenProps> = ({
  text,
  type = "button",
  variant = "default",
  loading = false,
  loadingText,
  className,
  children,
  ariaLabel,
  ...rest
}) => {
  const classes = cx(
    "flex flex-col items-center justify-center text-lg overflow-hidden font-medium leading-wide w-full py-2 px-4 rounded-md border-2 border-solid border-blue-dark active:bg-white-faded active:text-blue-dark transition duration-150",
    VARIANTS[variant],
    { "bg-white-faded text-blue-dark": loading },
    className
  );
  return (
    <button aria-label={ariaLabel} className={classes} {...rest} style={{ height: 48 }} disabled={loading} type={type}>
      <Transition
        show={!loading}
        enter="transform duration-300 delay-150"
        enterTo="translate-y-0"
        enterFrom="-translate-y-12"
        leave="transform duration-300"
        leaveTo="-translate-y-12"
        leaveFrom="translate-y-0"
        appear={false}
      >
        {text || children}
      </Transition>
      <Transition
        show={loading}
        enter="transform duration-300 delay-150"
        enterTo="translate-y-0"
        enterFrom="translate-y-12"
        leave="transform duration-300"
        leaveTo="translate-y-12"
        leaveFrom="translate-y-0"
        className="flex items-center"
      >
        <IonSpinner name="crescent" className="text-blue-dark -ml-2 mr-2" />
        <span className="text-base">{loadingText}</span>
      </Transition>
    </button>
  );
};

export default LoaderButton;
