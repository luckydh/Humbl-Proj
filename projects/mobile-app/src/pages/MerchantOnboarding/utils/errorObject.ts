import { TFnType } from "i18n";
import { LanguageMessages } from "joi";
import { useTranslation } from "react-i18next";

export function useGenericErrorMessages(): LanguageMessages {
  const { t } = useTranslation();
  return {
    "any.required": t("input.error.required"),
    "string.empty": t("input.error.string-empty"),
    "string.max": t("input.error.string-too-long"),
    "string.min": t("input.error.string-too-short"),
    "number.base": t("input.error.number-required"),
    "date.format": t("input.error.date-format"),
    "string.email": t("input.error.email-format"),
    "date.base": t("input.error.date-invalid"),
    "date.max": t("input.error.too-young"),
    "date.min": t("input.error.too-old"),
  };
}

export function makeGenericErrorMessages(t: TFnType): LanguageMessages {
  return {
    "any.required": t("input.error.required"),
    "string.empty": t("input.error.string-empty"),
    "string.max": t("input.error.string-too-long"),
    "string.min": t("input.error.string-too-short"),
    "number.base": t("input.error.number-required"),
    "date.format": t("input.error.date-format"),
    "string.email": t("input.error.email-format"),
    "date.base": t("input.error.date-invalid"),
    "date.max": t("input.error.too-young"),
    "date.min": t("input.error.too-old"),
  };
}
