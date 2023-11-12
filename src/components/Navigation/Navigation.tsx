import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowRight, Menu } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ModeToggle } from "../ModeToggle/ModeToggle"
import { Button } from "../ui/button"

export const Navigation = () => {
  const plLang = "https://cdn.kcak11.com/CountryFlags/countries/pl.svg"
  const engLang = "https://cdn.kcak11.com/CountryFlags/countries/gb.svg"
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pl" : "en"
    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage)
  }

  return (
    <div className="w-screen py-2 px-4 border-b-2 flex justify-between items-center">
      <h3 className="text-2xl font-semibold text-primary tracking-widest lg:hidden">GmbH</h3>
      <div className="hidden lg:flex items-center space-x-8">
        <h3 className="text-2xl font-semibold text-primary tracking-widest">GmbH</h3>
        <div className="space-x-2">
          <Button variant={"ghost"}>{t("navbar.about")}</Button>
          <Button variant={"ghost"}>{t("navbar.current_news")}</Button>
          <Button variant={"ghost"}>{t("navbar.our-projects")}</Button>
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
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
                  className="w-6 h-6"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("navbar.language_toggle_tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ModeToggle />
        <Button asChild>
          <Link to={"/collaboration"}>
            <div className="space-x-2 flex items-center">
              <span>{t("navbar.collaboration")}</span> <ArrowRight />
            </div>
          </Link>
        </Button>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <Button
            asChild
            size="icon"
            variant="outline"
          >
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
          </Button>
          <SheetContent>
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col my-10 space-y-4">
                <Button variant="ghost">About</Button>
                <Button variant="ghost">Current News</Button>
                <Button variant="ghost">Our Projects</Button>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Button asChild>
                  <Link to={"/collaboration"}>
                    <div className="space-x-2 flex items-center ">
                      <span>Collaboration</span>
                      <ArrowRight />
                    </div>
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2">
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
                            className="w-6"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to english</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <ModeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
