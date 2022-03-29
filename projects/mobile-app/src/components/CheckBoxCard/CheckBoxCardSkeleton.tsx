import React from "react";
import RadioButton from "components/RadioButton/RadioButton";
import { CheckBoxCardContainerSkeleton } from "./CheckBoxCardContainerSkeleton";

interface Props {
  className?: string;
}

export const CheckBoxCardSkeleton: React.FC<Props> = ({ className }) => (
  <CheckBoxCardContainerSkeleton className={className}>
    <RadioButton selected={false} />
  </CheckBoxCardContainerSkeleton>
);
