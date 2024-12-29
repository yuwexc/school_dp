import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from '../public/locales/en/translation.json'
import translationRU from '../public/locales/ru/translation.json'

export const defaultNS = "translation";

export const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    }
} as const;

i18next.use(initReactI18next).init({
    lng: localStorage.getItem('INTERFACE_LANGUAGE') || "en",
    ns: ["translation"],
    defaultNS,
    resources,
});

export default i18next;