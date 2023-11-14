import { useNavigationRefsContext } from "@/context/navigationRefsContext"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../SectionTitle"

export const About = () => {
  const { t } = useTranslation()
  const { aboutRef } = useNavigationRefsContext()

  type DescriptionType = {
    title: string
    description: string
  }

  const descriptions: DescriptionType[] = [
    { title: t("about.subtitle_one"), description: t("about.description_one") },
    {
      title: t("about.subtitle_two"),
      description: t("about.description_two"),
    },
    {
      title: t("about.subtitle_three"),
      description: t("about.description_three"),
    },
    {
      title: t("about.subtitle_four"),
      description: t("about.description_four"),
    },
    {
      title: t("about.subtitle_five"),
      description: t("about.description_five"),
    },
    {
      title: "",
      description: t("about.invitation_to_contact"),
    },
  ]

  const SubjectLine = ({ title, description, even }: DescriptionType & { even: boolean }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    return (
      <div
        style={{
          transform: isInView ? "none" : even ? "translateX(-20px)" : "translateX(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <h3 className="text-primary">{title}</h3>
        <p ref={ref}>{description}</p>
      </div>
    )
  }

  return (
    <section
      id="about-section"
      ref={aboutRef}
      className="min-h-screen bg-secondary"
    >
      <div className="container py-20">
        <SectionTitle>{t("about.title")}</SectionTitle>
        <article className="prose-2xl">
          {descriptions.map(({ title, description }, i) => (
            <SubjectLine
              key={i}
              title={title}
              description={description}
              even={i % 2 === 0}
            />
          ))}
        </article>
      </div>
    </section>
  )
}
