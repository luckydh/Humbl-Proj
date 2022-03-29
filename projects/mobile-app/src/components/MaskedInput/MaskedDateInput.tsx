import React from "react";
import NumberFormat from "react-number-format";
import { Controller, FieldErrors, UseFormMethods, UseControllerOptions } from "react-hook-form";
import { Message } from "../Message/Message";
import { FieldDefinitions } from "pages/MerchantOnboarding/utils/getSchema";
import { LabelContainer, wrapperBaseClasses, inputBaseClasses } from "../Input/Input";

type PlaceholderType = "MM/YYYY" | "MM/DD/YYYY" | "DD/MM/YYYY";

export interface MaskedDateInputProps {
  field: FieldDefinitions;
  errors: FieldErrors;
  control: UseFormMethods["control"];
  placeholder?: PlaceholderType;
  defaultValue?: string;
  rules?: UseControllerOptions["rules"];
}

const placeholderMasks: Record<PlaceholderType, string[]> = {
  "MM/YYYY": ["M", "M", "Y", "Y", "Y", "Y"],
  "MM/DD/YYYY": ["M", "M", "D", "D", "Y", "Y", "Y", "Y"],
  "DD/MM/YYYY": ["D", "D", "M", "M", "Y", "Y", "Y", "Y"],
};

// TODO: Make this component more generic and remove the dependency from `FieldDefinitions`.
// We can't do that currently because of how `RenderFormFields` renders custom components (passing a `field` prop).
// Maybe create another component that is generic and one tied to the `RenderFormFields` logic.
export const MaskedDateInput = ({
  field,
  errors,
  control,
  placeholder = "MM/DD/YYYY",
  defaultValue,
  rules,
}: MaskedDateInputProps) => {
  const mask = placeholderMasks[placeholder];
  const format = placeholder.replace(/[A-Z]/g, "#");
  return (
    <div className="mb-2">
      {field.label && <LabelContainer ariaLabel={field.ariaLabel && `${field.ariaLabel}_LABEL`} label={field.label} />}
      <div className={wrapperBaseClasses} aria-label={field.ariaLabel && `${field.ariaLabel}_INPUT_WRAPPER`}>
        <Controller
          name={field.name}
          rules={rules}
          control={control}
          defaultValue={defaultValue || null}
          render={({ onChange, onBlur, value }) => (
            <NumberFormat
              mask={mask}
              format={format}
              placeholder={placeholder}
              className={inputBaseClasses}
              // TODO: fix this type
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              control={control}
              // this pattern and inputMode force number keyboard
              pattern="[0-9, \/]*"
              inputMode="numeric"
              name={field.name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              style={{ height: 48, fontSize: 20 }}
              aria-label={field.ariaLabel && `${field.ariaLabel}_FIELD`}
            />
          )}
        />
      </div>
      {errors[field.name] && (
        <div className="my-2">
          <Message
            variant="error"
            ariaLabel={
              errors[field.name].message && errors[field.name]?.type === "date.max"
                ? `${field.ariaLabel}MINIMUM_ALERT_LABEL`
                : errors[field.name]?.type === "date.min"
                ? `${field.ariaLabel}MAXIMUM_ALERT_LABEL`
                : errors[field.name]?.type === "date.base" || errors[field.name]?.type === "required"
                ? `${field.ariaLabel}ALERT_LABEL`
                : `${field.ariaLabel}INVALID_ALERT_LABEL`
            }>
            {errors[field.name].message}
          </Message>
        </div>
      )}
    </div>
  );
};
