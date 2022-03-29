import Joi, { AnySchema, ObjectSchema } from "joi";
import React from "react";
import getOptions, { SelectOption } from "pages/MerchantOnboarding/utils/getOptions";
import { Countries } from "utils/Countries";

export type FieldDefinitions = {
  country: Countries[];
  name: string;
  label?: string;
  schema?: AnySchema;
  component?: React.FunctionComponent<any>;
  componentProps?: Record<string, any>;
  options?: SelectOption[];
  componentSchema?: SchemaRecord[];
  infoText?: string;
  type?: "input" | "select" | "checkbox";
  isSecure?: boolean;
};

export type ComponentSchemaRecord = { [key: string]: Joi.ObjectSchema }[];
export type SchemaRecord = { [key: string]: Joi.AnySchema };

export type FormComponentProps = {
  register?: any;
  field?: FieldDefinitions;
  errors?: any;
};

export const getSchema = (fields: FieldDefinitions[], country: Countries) => {
  const filtered = fields.filter((elem) => elem.country.includes(country));
  let schema: ObjectSchema = Joi.object({
    test: Joi.string(),
  }).unknown();
  filtered.forEach((elem) => {
    if (elem.component) {
      elem.componentSchema?.forEach((rule) => {
        schema = schema.concat(Joi.object(rule).unknown());
      });
      return;
    }

    if (elem.schema) {
      /**
       * TODO: This was partially working, but currently removed
       * any dot named fields in schema. React Hook Form supports nested structure
       * so that form results can be stored as objects and arrays, but the JOI
       * format has to be different to match the object/array fields.
       * Paused work on this as it won't be called
       */
      const isNested = elem.name.split(".");
      if (isNested.length > 1) {
        const newKey: SchemaRecord = {};
        newKey[elem.name] = Joi.object({ [isNested[0]]: elem.schema });
        // Possible solution below, but untested due to time.
        // newKey[elem.name] = Joi.object().keys({ [isNested[0]]: { [isNested[0]]: elem.schema } });
        schema = schema.concat(Joi.object(newKey));
      } else {
        const newKey: SchemaRecord = {};
        newKey[elem.name] = elem.schema;
        schema = schema.concat(Joi.object(newKey));
      }

      if (
        elem.name === "addressState" ||
        elem.name === "individualAddressState" ||
        elem.name === "owner_0_addressState"
      ) {
        elem.options = getOptions(country);
      }
    }
  });

  return {
    fields: filtered,
    schema,
  };
};
