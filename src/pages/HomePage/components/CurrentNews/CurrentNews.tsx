import { useNavigationRefsContext } from "@/context/navigationRefsContext"

import { SectionTitle } from "../SectionTitle"
import { useTranslation } from "react-i18next"

export const CurrentNews = () => {
  const { currentNews } = useNavigationRefsContext()
  const { t } = useTranslation()
  return (
    <section
      id="current-news-section"
      className="h-screen"
      ref={currentNews}
    >
      <div className="container py-10">
        <SectionTitle>{t("current-news.title")}</SectionTitle>
      </div>
    </section>
  )
}
