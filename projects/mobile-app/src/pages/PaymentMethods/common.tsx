import React from "react";
import cx from "classnames";
import { CheckBoxCardContainerSkeleton } from "components/CheckBoxCard";
import { PaymentMethodCategory } from "generated/graphql";

type PaymentMethodIconProps = { transparent?: boolean };

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ transparent = false, children }) => (
  <div
    className={cx("w-7 h-7 py-1.5 mr-1 rounded-md flex items-center justify-center", {
      "bg-blue-light": !transparent,
    })}>
    {children}
  </div>
);

type TitleProps = {
  ariaLabel?: string;
};

export const Title: React.FC<TitleProps> = ({ children, ariaLabel }) => (
  <p className="font-bold tracking-wide leading-5 text-base" aria-label={ariaLabel || "TITLE_COMPONENT"}>
    {children}
  </p>
);

export const SubTitle: React.FC<TitleProps> = ({ children, ariaLabel }) => (
  <p className="text-sm truncate" aria-label={ariaLabel || "SUB_TITLE_COMPONENT"}>
    {children}
  </p>
);

export const Divider = () => <span className="h-px w-full block bg-gray-100 my-4" />;

export type PaymentTypes = PaymentMethodCategory | "ALL";

export const Loading = () => (
  <div className="px-6">
    <CheckBoxCardContainerSkeleton className="mb-2" />
    <CheckBoxCardContainerSkeleton className="mb-2" />
    <CheckBoxCardContainerSkeleton className="mb-2" />
  </div>
);

export const formatMaskedValue = (value?: string | number): string => `**** ${String(value).slice(-4)}`;
