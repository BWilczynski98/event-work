import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ModeToggle } from "../ModeToggle/ModeToggle"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from "react-router-dom"

export const Navigation = () => {
  const plLang = "https://cdn.kcak11.com/CountryFlags/countries/pl.svg"
  const engLang = "https://cdn.kcak11.com/CountryFlags/countries/gb.svg"
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
    <div className="w-screen py-2 px-6 border-b-2 flex justify-between items-center">
      <div className="flex items-center space-x-8 ">
        <div className="text-2xl font-semibold text-primary tracking-widest italic">
          <h3>GmbH</h3>
        </div>
        <div className="space-x-2">
          <Button variant={"ghost"}>About</Button>
          <Button variant={"ghost"}>Current News</Button>
          <Button variant={"ghost"}>Our Projects</Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={handleChangeLanguage}
                variant="secondary"
                size="icon"
              >
                <img
                  src={language === "en" ? plLang : engLang}
                  className="w-4 h-4"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to english</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ModeToggle />
        <Button asChild>
          <Link to={"/collaboration"}>
            <div className="space-x-2 flex items-center">
              <span>Collaboration</span> <ArrowRight />
            </div>
          </Link>
        </Button>
      </div>
    </div>
  )
}
