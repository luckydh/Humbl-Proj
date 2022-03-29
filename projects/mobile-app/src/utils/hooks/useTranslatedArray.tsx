import { useTranslation } from "react-i18next";

export function useTranslatedArray(array: string[]) {
  const { t } = useTranslation();
  const translatedAnd = t("global.and");

  if (array.length === 0) {
    return "";
  }

  if (array.length <= 2) {
    return array.join(` ${translatedAnd} `);
  }

  return `${array.slice(0, -1).join(", ")} ${translatedAnd} ${array[array.length - 1]}`;
}
