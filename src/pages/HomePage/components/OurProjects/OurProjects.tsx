import { useNavigationRefsContext } from "@/context/navigationRefsContext"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../SectionTitle"

export const OurProjects = () => {
  const { ourProjects } = useNavigationRefsContext()
  const { t } = useTranslation()
  return (
    <section
      id="our-projects-id"
      ref={ourProjects}
      className="h-screen bg-secondary"
    >
      <div className="container py-10">
        <SectionTitle>{t("our-projects.title")}</SectionTitle>
      </div>
    </section>
  )
}
