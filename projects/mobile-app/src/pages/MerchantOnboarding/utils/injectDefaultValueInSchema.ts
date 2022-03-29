import { FieldDefinitions } from "./getSchema";

export interface InjectDefaultValueInSchemaProps {
  fieldList: FieldDefinitions[];
  defaultValues: Record<string, any> | undefined;
}

export const injectDefaultValueInSchema = ({ fieldList, defaultValues }: InjectDefaultValueInSchemaProps) => {
  if (defaultValues !== undefined) {
    return fieldList.map((item) => {
      if (defaultValues[item.name]) {
        item.defaultValue = defaultValues[item.name];
      }
      return item;
    });
  }
    return fieldList;
};
