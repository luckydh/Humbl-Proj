import { IonButton } from "@ionic/react";
import React from "react";

import "./Button.scss";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  color?: string;
  fill?: any;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color,
  fill,
  disabled = false,
  type,
  onClick,
}: ButtonProps) => (
    <IonButton
      className="btn-customised"
      disabled={disabled}
      color={color}
      type={type}
      fill={fill}
      onClick={onClick}
    >
      {label}
    </IonButton>
  );

export default Button;
