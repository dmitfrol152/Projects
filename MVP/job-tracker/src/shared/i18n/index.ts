import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./resources/en/common.json";
import enDashboard from "./resources/en/dashboard.json";
import enFooter from "./resources/en/footer.json";
import enHeader from "./resources/en/header.json";
import enHh from "./resources/en/hh.json";
import enLogin from "./resources/en/login.json";
import enNavigation from "./resources/en/navigation.json";
import enNotification from "./resources/en/notification.json";
import enPagination from "./resources/en/pagination.json";
import enRegistration from "./resources/en/registration.json";
import enReminders from "./resources/en/reminders.json";
import enSettings from "./resources/en/settings.json";
import enStatistics from "./resources/en/statistics.json";

import ruCommon from "./resources/ru/common.json";
import ruDashboard from "./resources/ru/dashboard.json";
import ruFooter from "./resources/ru/footer.json";
import ruHeader from "./resources/ru/header.json";
import ruHh from "./resources/ru/hh.json";
import ruLogin from "./resources/ru/login.json";
import ruNavigation from "./resources/ru/navigation.json";
import ruNotification from "./resources/ru/notification.json";
import ruPagination from "./resources/ru/pagination.json";
import ruRegistration from "./resources/ru/registration.json";
import ruReminders from "./resources/ru/reminders.json";
import ruSettings from "./resources/ru/settings.json";
import ruStatistics from "./resources/ru/statistics.json";

const i18nInstance = i18n.use(LanguageDetector).use(initReactI18next);

i18nInstance.init({
  fallbackLng: "en",
  supportedLngs: ["en", "ru"],
  debug: false,

  resources: {
    en: {
      common: enCommon,
      dashboard: enDashboard,
      footer: enFooter,
      header: enHeader,
      hh: enHh,
      login: enLogin,
      navigation: enNavigation,
      notification: enNotification,
      pagination: enPagination,
      registration: enRegistration,
      reminders: enReminders,
      settings: enSettings,
      statistics: enStatistics,
    },
    ru: {
      common: ruCommon,
      dashboard: ruDashboard,
      footer: ruFooter,
      header: ruHeader,
      hh: ruHh,
      login: ruLogin,
      navigation: ruNavigation,
      notification: ruNotification,
      pagination: ruPagination,
      registration: ruRegistration,
      reminders: ruReminders,
      settings: ruSettings,
      statistics: ruStatistics,
    },
  },

  ns: [
    "common",
    "dashboard",
    "footer",
    "header",
    "hh",
    "login",
    "navigation",
    "notification",
    "pagination",
    "registration",
    "reminders",
    "settings",
    "statistics",
  ],
  // defaultNS: "common",

  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
});

export { i18nInstance };
export default i18nInstance;
