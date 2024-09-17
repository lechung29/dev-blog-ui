import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import enLang from "./locale/en.locale.json";
import vnLang from "./locale/vn.locale.json";

const resources = {
    en: { translation: enLang },
    vn: { translation: vnLang },
};

const currentLanguage = localStorage.getItem("i18nextLng");

i18n.use(Backend)
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "vn"],
        lng: currentLanguage || "en",
        fallbackLng: "en",
        detection: {
            order: ["cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
            caches: ["cookie", "localStorage"],
        },
        interpolation: {
            escapeValue: false,
        },
        debug: true,
        react: {
            useSuspense: false,
        },
        resources,
    });

export default i18n;
