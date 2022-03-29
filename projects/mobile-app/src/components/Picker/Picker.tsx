import React from "react";
import { IonModal } from "@ionic/react";
import { CheckIcon } from "assets/svgs/CheckIcon";
import { PickerModalContent } from "./PickerModalContent";

import "./styles.scss";

interface PickerItemProps {
  value: any;
  label: string;
  selected?: boolean;
}

interface PickerComposition {
  Item: React.FC<PickerItemProps>;
}

export interface PickerProps {
  open?: boolean;
  title?: string;
  children: React.ReactNode;
  value?: any;
  onChange: (value: any) => void;
  onClose: () => void;
  onReset?: () => void;
  onCancel?: () => void;
  showResetButton?: boolean;
  resetButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  closeOnClickOutside?: boolean;
}

type PickerComponent = React.FC<PickerProps> & PickerComposition;

export const Picker: PickerComponent = ({
  title,
  open = true,
  value,
  children,
  onClose,
  onChange,
  onReset,
  onCancel,
  showResetButton = false,
  resetButtonText = "Reset",
  showCancelButton = false,
  cancelButtonText = "Cancel",
  closeOnClickOutside = false,
}) => {
  const handleChange = (newValue: any) => {
    onChange(newValue);
    onClose();
  };

  const options = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        selected: value === child.props.value,
        onClick: () => handleChange(child.props.value),
      });
    }
  });

  return (
    <IonModal
      mode="md"
      isOpen={open}
      showBackdrop={true}
      cssClass="picker-modal"
      onDidDismiss={onClose}
      backdropDismiss={closeOnClickOutside}
    >
      <PickerModalContent title={title}>
        {options}
        <div className="flex">
          {showResetButton && (
            <button
              onClick={onReset}
              className="flex-1 text-white py-4 text-center font-semibold border-white border-t border-r border-solid border-opacity-20"
            >
              {resetButtonText}
            </button>
          )}
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="flex-1 text-white py-4 text-center font-semibold border-white border-t border-solid border-opacity-20"
            >
              {cancelButtonText}
            </button>
          )}
        </div>
      </PickerModalContent>
    </IonModal>
  );
};

const Item: React.FC<Omit<PickerItemProps, "value">> = ({ label, selected, ...rest }) => (
  <button
    type="button"
    className="text-white font-medium py-4 px-4 text-left flex items-center justify-between border-white border-t border-solid border-opacity-20"
    {...rest}
  >
    <span>{label}</span>
    {selected && <CheckIcon className="w-4 h-4" />}
  </button>
);

Picker.Item = Item;
