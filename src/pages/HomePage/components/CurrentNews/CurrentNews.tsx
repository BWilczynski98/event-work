import { Button } from "@/components/ui/button"
import { useNavigationRefsContext } from "@/context/navigationRefsContext"
import { useInView } from "framer-motion"
import i18next, { t } from "i18next"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../SectionTitle"
import { current_news_en, current_news_pl } from "./current_news"

type NewsTileProps = {
  image?: string
  title: string
  description: string
}

const NewsTile = ({ image, title, description }: NewsTileProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div
      className="md:flex md:space-x-8"
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      <img
        src={image}
        className="w-full rounded-lg max-w-md"
        ref={ref}
      />

      <div className="md:w-1/2">
        <div className="space-y-4">
          <h1 className="prose-2xl">{title}</h1>
          <p className="prose-lg">{description}</p>
        </div>
        <div className="mt-10">
          <Button>{t("news.read_more")}</Button>
        </div>
      </div>
    </div>
  )
}

export const CurrentNews = () => {
  console.log(window.location.origin)
  const lng = i18next.language
  console.log(lng)
  const { currentNews } = useNavigationRefsContext()
  const { t } = useTranslation()
  const news = lng === "pl" ? current_news_pl : current_news_en
  return (
    <section
      id="current-news-section"
      ref={currentNews}
    >
      <div className="container py-10">
        <SectionTitle>{t("current-news.title")}</SectionTitle>
        <div className="space-y-8">
          {news.map((item, i) => {
            return (
              <div key={item.title + i}>
                <NewsTile
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
