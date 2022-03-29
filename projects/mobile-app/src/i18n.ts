import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { register } from "timeago.js";
import { es, pt_BR } from "timeago.js/lib/lang";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
//import resources from "./locales/index";
// resources: resources,

export type TFnType = ReturnType<typeof useTranslation>["t"];

register("es", es);
register("pt", pt_BR);

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      loadPath: "https://api.locize.app/f4e7a8d0-8642-44bb-ad02-ce1d5554b83c/latest/{{lng}}/{{ns}}",
      addPath: "https://api.locize.app/f4e7a8d0-8642-44bb-ad02-ce1d5554b83c/latest/add/{{lng}}/{{ns}}",
      allowMultiLoading: false,
    },
    //resources,
    //If we don't have a transalation and only have empty string, display fallback
    returnEmptyString: false,
    fallbackLng: "en",
    debug: false,
    ns: "translation",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
