import React, { FC } from "react";
import { IonIcon } from "@ionic/react";
import { CheckBoxCardContainer } from "./CheckBoxCardContainer";
import { closeBankIcon } from "assets/icons";
import RadioButton from "../RadioButton/RadioButton";

export interface CheckBoxCardProps {
  /**
   * The card title.
   */
  title: string | React.ReactNode;

  /**
   * The card subtitle, which goes under the title.
   */
  subtitle?: string | React.ReactNode;

  /**
   * Indicates whether the checkbox is marked or not.
   * @default false
   */
  selected?: boolean;

  /**
   * Indicates whether the checkbox is disabled or not. Only style treatment
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon to be displayed.
   * If it's a string, it will be rendered with IonIcon.
   * If it's a React Node, it will be rendered as is.
   */
  icon?: string | React.ReactNode;

  /**
   * Indicates whether the "dismiss" function should be displayed or not.
   * If this is true, the "dismiss" has display priority over the check mark.
   * @default false
   */
  showDismiss?: boolean;

  /**
   * Content to be displayed at the bottom flex line.
   */
  bottomLineContent?: React.ReactNode;

  /**
   * Content to be displayed at the middle flex column.
   */
  middleColumnContent?: React.ReactNode;

  /**
   * Handler for clicking on the item.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Handler for clicking on the "dismiss" button.
   */
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;

  ariaLabel?: string;
}

export const CheckBoxCard: FC<CheckBoxCardProps> = ({
  title,
  icon,
  subtitle = "",
  selected = false,
  disabled = false,
  showDismiss = false,
  bottomLineContent,
  middleColumnContent,
  onClick,
  onDismiss,
  ariaLabel,
}) => (
  <CheckBoxCardContainer
    title={title}
    subtitle={subtitle}
    disabled={disabled}
    selected={selected}
    onClick={onClick}
    icon={icon}
    ariaLabel={ariaLabel}>
    {middleColumnContent}
    <div className="flex ml-6">
      {!!onClick && !showDismiss ? (
        <RadioButton selected={selected} ariaLabel={ariaLabel && `${ariaLabel}_RADIO_BUTTON`} />
      ) : (
        <button type="button" onClick={onDismiss} disabled={disabled}>
          <IonIcon icon={closeBankIcon} className="h-full mr-1" />
        </button>
      )}
    </div>
    {bottomLineContent && <div className="flex-grow w-full">{bottomLineContent}</div>}
  </CheckBoxCardContainer>
);

CheckBoxCard.displayName = "CheckBoxCard";
