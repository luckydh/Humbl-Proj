import React from "react";
import { IonToggle } from "@ionic/react";
import { ToggleChangeEventDetail } from "@ionic/core";
import "./styles.scss";

export interface ToggleProps {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onBlur?: (event: CustomEvent<void>) => any;
  onFocus?: (event: CustomEvent<void>) => any;
  onChange?: (event: CustomEvent<ToggleChangeEventDetail>) => any;
}

export const Toggle: React.FC<ToggleProps> = ({ onBlur, onFocus, onChange, ...rest }) => (
    <IonToggle
      {...rest}
      mode="ios"
      onIonBlur={onBlur}
      onIonFocus={onFocus}
      onIonChange={onChange}
    />
  );

export default Toggle;
