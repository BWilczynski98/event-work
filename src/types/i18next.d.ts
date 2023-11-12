import "i18next"
import enJSON from "../locales/en/en.json"

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ns1"
    // custom resources type
    resources: {
      ns1: typeof enJSON
    }
    // other
  }
}
