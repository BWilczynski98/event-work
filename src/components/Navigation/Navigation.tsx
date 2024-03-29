import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigationRefsContext } from "@/context/navigationRefsContext"
import { ArrowRight, Menu } from "lucide-react"
import React, { RefObject, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ModeToggle } from "../ModeToggle/ModeToggle"
import { Button } from "../ui/button"

/** Helpers */
const plLang = "https://cdn.kcak11.com/CountryFlags/countries/pl.svg"
const engLang = "https://cdn.kcak11.com/CountryFlags/countries/gb.svg"

export const Navigation = () => {
  /** HOOKS */
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const { aboutRef, currentNews, ourProjects } = useNavigationRefsContext()
  console.log("🚀 ~ file: Navigation.tsx:23 ~ Navigation ~ aboutRef:", aboutRef)

  /** Functions */
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pl" : "en"
    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage)
  }

  const handleScrollToSection = (section: RefObject<HTMLElement>) => {
    section.current?.scrollIntoView({ behavior: "smooth" })
  }

  /** Constants */
  type Link = {
    label: string
    onClick: () => void
  }

  const links: Link[] = [
    { label: t("navbar.about"), onClick: () => handleScrollToSection(aboutRef) },
    { label: t("navbar.current_news"), onClick: () => handleScrollToSection(currentNews) },
    { label: t("navbar.our-projects"), onClick: () => handleScrollToSection(ourProjects) },
    // Here you can add links in the future, if needed
  ]

  return (
    <nav className="w-screen py-2 px-8 flex justify-between items-center">
      <h3 className="text-2xl font-semibold text-primary tracking-wide lg:hidden">Most Competence</h3>
      <div className="hidden lg:flex items-center space-x-8">
        <h3 className="text-2xl font-semibold text-primary tracking-wide">Most Competence</h3>
        <div className="space-x-2">
          {links.map((link, i) => (
            <React.Fragment key={link.label + i}>
              <Button
                variant="ghost"
                onClick={link.onClick}
              >
                {link.label}
              </Button>
            </React.Fragment>
          ))}
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
          {/* Mobile menu */}
          <SheetContent>
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col justify-center space-y-4 my-10">
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
    </nav>
  )
}
