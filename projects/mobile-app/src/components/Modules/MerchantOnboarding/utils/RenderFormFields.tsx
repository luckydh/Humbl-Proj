import React from "react";
import { Control } from "react-hook-form";
import Input from "components/Input/Input";
import { Message } from "components/Message/Message";
import { Checkbox } from "components/Checkbox/Checkbox";
import { FieldDefinitions } from "./getSchema";
import { Select } from "components/Select/Select";
import Label from "components/Label/Label";
import { IonIcon } from "@ionic/react";
import { InfoIcon } from "assets/icons";

interface Props {
  fields: FieldDefinitions[];
  register: any;
  control: Control;
  errors: any;
  prepend?: string;
}

export const RenderFormFields = ({ fields, register, errors, control, prepend = "" }: Props) => {
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
      return (
        <div key={fieldName} className="flex align-middle items-center justify-between mx-6">
          <span>{field.label}</span>
          <Checkbox size="large" name={fieldName} control={control} defaultValue={false} />
        </div>
      );
    }

    if (field?.options && field.options.length > 0) {
      return (
        <div key={fieldName} className="mb-4">
          <Label>{field.label}</Label>
          <Select
            options={field.options}
            name={fieldName}
            register={register}
            placeholder={field.label}
            hasError={errors[fieldName]}
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
          placeholder={field.label}
          hasError={errors[fieldName]}
          isSecure={field.isSecure}
        />
        {field.infoText && (
          <div className="flex items-center mt-2 mb-4 ml-2">
            <IonIcon className="text-xs mr-2" icon={InfoIcon} />
            <p className="text-white text-xs opacity-80 ">{field.infoText}</p>
          </div>
        )}
        {errors[fieldName]?.message && (
          <div className="my-2">
            <Message variant="error">{errors[fieldName].message}</Message>
          </div>
        )}
      </div>
    );
  });
  return <>{final}</>;
};
