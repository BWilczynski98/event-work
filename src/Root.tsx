import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./App.css"
import { Button } from "./components/ui/button"
import { CompanyContactFormScreen } from "./screens"
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import { ModeToggle } from "./components/ModeToggle/ModeToggle"
import { Toaster } from "@/components/ui/toaster"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pl" : "en"
    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage)
  }

  return (
    <div className="px-2 py-4">
      <ThemeProvider>
        <Button
          type="button"
          onClick={handleChangeLanguage}
        >
          Change Language
        </Button>
        <ModeToggle />
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default function Root() {
  return (
    <Layout>
      <CompanyContactFormScreen />
    </Layout>
  )
}
