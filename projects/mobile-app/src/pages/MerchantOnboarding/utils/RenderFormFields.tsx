import React from "react";
import { Control, Controller } from "react-hook-form";
import Input from "components/Input/Input";
import { Message } from "components/Message/Message";
import { Checkbox } from "components/Checkbox/Checkbox";
import { FieldDefinitions } from "./getSchema";
import { Select } from "components/Select/Select";
import Label from "components/Label/Label";
import { IonIcon } from "@ionic/react";
import { InfoIcon } from "assets/icons";
import { PhoneInput } from "components/PhoneInput/PhoneInput";
import { useTranslation } from "react-i18next";

interface Props {
  fields: FieldDefinitions[];
  register: any;
  control: Control;
  errors: any;
  prepend?: string;
}

export const RenderFormFields: React.FC<Props> = ({ fields, register, errors, control, prepend = "" }) => {
  const { t } = useTranslation();
  const final = fields.map((field) => {
    const fieldName = `${prepend}${field.name}`;
    if (field.component) {
      const Component = field.component;
      return (
        <div key={fieldName}>
          <Component register={register} errors={errors} field={field} control={control} {...field.componentProps} />
        </div>
      );
    }

    if (field.type === "checkbox") {
      if (field?.componentProps?.variant === "checkbox-first") {
        return (
          <div className="flex mb-4 text-white items-center">
            <div className="mt-1.5">
              <Checkbox
                size="default"
                name={field.name}
                control={control}
                defaultValue={false}
                hasError={errors[fieldName]}
              />
            </div>
            <div className="ml-3.5">{field.label}</div>
          </div>
        );
      }
      return (
        <div key={fieldName} className="flex align-middle items-center justify-between mx-6">
          <label htmlFor={fieldName}>{field.label}</label>
          <Checkbox
            id={fieldName}
            size="large"
            name={fieldName}
            control={control}
            defaultValue={field.defaultValue || false}
            hasError={errors[fieldName]}
          />
        </div>
      );
    }
    if (field.type === "phoneNumber") {
      return (
        <div key={fieldName}>
          <Controller
            control={control}
            name={fieldName}
            render={({ onChange, onBlur, value, name }) => (
              <PhoneInput
                label={field.label}
                onBlur={onBlur}
                onChange={onChange}
                defaultCountry="US"
                onCountryChange={() => {}}
                value={value}
                name={name}
                placeholder={field?.placeholder ? field?.placeholder : field?.label}
                ariaLabel={field.ariaLabel}
              />
            )}
          />
          {errors[fieldName]?.message && (
            <div className="my-2">
              <Message variant="error" ariaLabel={errors[fieldName].message && `${field.ariaLabel}ALERT_LABEL`}>
                {errors[fieldName].message}
              </Message>
            </div>
          )}
        </div>
      );
    }

    if (field?.options && field.options.length > 0) {
      return (
        <div key={fieldName} className="mb-4">
          <Label ariaLabel={field.ariaLabel && `${field.ariaLabel}_LABEL`}>{field.label}</Label>
          <Select
            options={field.options}
            name={fieldName}
            register={register}
            placeholder={field?.placeholder ? field?.placeholder : field?.label}
            hasError={errors[fieldName]}
            defaultValue={field.defaultValue}
            ariaLabel={field.ariaLabel}
          />
          {errors[fieldName]?.message && (
            <div className="my-2">
              <Message variant="error">{errors[fieldName].message}</Message>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={fieldName}>
        <Input
          label={field.label}
          name={fieldName}
          register={register}
          placeholder={field?.placeholder ? field?.placeholder : field?.label}
          hasError={errors[fieldName]}
          isSecure={field.isSecure}
          defaultValue={field.defaultValue}
          ariaLabel={field.ariaLabel}
          ariaLabelValue={field.ariaLabelValue ? field.ariaLabelValue : field.ariaLabel}
        />
        {field.infoText && (
          <div className="flex items-center mt-2 mb-4 ml-2">
            <IonIcon className="text-xs mr-2" icon={InfoIcon} />
            <p className="text-white text-xs opacity-80 ">{field.infoText}</p>
          </div>
        )}
        {errors[fieldName]?.message && (
          <div className="my-2">
            <Message
              variant="error"
              ariaLabel={
                errors[fieldName].message && errors[fieldName].message === t("input.error.required")
                  ? `${field.ariaLabel}ALERT_LABEL`
                  : errors[fieldName].message === t("merchant-create-page.message.po-box-invalid")
                  ? `${field.ariaLabel}POALERT_LABEL`
                  : `${field.ariaLabel}LIMITALERT_LABEL`
              }>
              {errors[fieldName].message}
            </Message>
          </div>
        )}
      </div>
    );
  });
  return <>{final}</>;
};
