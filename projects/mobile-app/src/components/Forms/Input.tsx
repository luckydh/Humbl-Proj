import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  readonly = false,
  disabled = false,
}: InputProps) => (
    <IonItem>
      {label && <IonLabel>{label}</IonLabel>}
      <IonInput placeholder={placeholder} readonly={readonly} disabled={disabled} />
    </IonItem>
  );

export default Input;
