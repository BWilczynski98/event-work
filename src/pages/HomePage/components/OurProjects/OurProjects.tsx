import { useNavigationRefsContext } from "@/context/navigationRefsContext"
import { useInView } from "framer-motion"
import i18next from "i18next"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../SectionTitle"
import { our_projects_en, our_projects_pl } from "./our_projcets"

type NewsTileProps = {
  image?: string
  title: string
  description: string
}

const ProjectTile = ({ image, title, description }: NewsTileProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div
      className="w-96 space-y-4"
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      <img
        src={image}
        className="rounded-lg w-full aspect-[4/3]"
        ref={ref}
        alt={title}
      />
      <div className="space-y-4 text-center">
        <h1 className="prose-2xl">{title}</h1>
        <p className="prose-lg">{description}</p>
      </div>
    </div>
  )
}
export const OurProjects = () => {
  const { ourProjects } = useNavigationRefsContext()
  const { t } = useTranslation()
  const lng = i18next.language
  const projects = lng === "pl" ? our_projects_pl : our_projects_en
  return (
    <section
      id="our-projects-id"
      ref={ourProjects}
      className="bg-secondary"
    >
      <div className="container py-10">
        <SectionTitle>{t("our-projects.title")}</SectionTitle>

        <div className="flex flex-wrap w-full justify-between">
          {projects.map((item, i) => {
            return (
              <div key={item.title + i}>
                <ProjectTile
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
