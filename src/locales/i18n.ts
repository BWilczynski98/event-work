import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enJSON from "./en/en.json"
import plJSON from "./pl/pl.json"

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: plJSON },
    en: {
      translation: enJSON,
    },
  }, // Where we're gonna put translations' files
  lng: "pl", // Set the initial language of the App
})
