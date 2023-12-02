import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { RoutesName } from "@/routes/routes"
import { ArrowRight } from "lucide-react"
import MyImage from "../../assets/undraw_collaboration_re_vyau.svg"
//     className="h-full flex justify-center items-center lg:justify-evenly"
export const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className="h-[80dvh] container overflow-hidden">
      <motion.div
        className="h-full flex items-center justify-between"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-8 max-w-xl prose-xl">
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
          <Button
            asChild
            variant="outline"
          >
            <Link
              to={RoutesName.collaboration}
              className="space-x-2"
            >
              <span>{t("navbar.collaboration")}</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="hidden lg:block">
          <img
            src={MyImage}
            className="max-w-[600px] w-[35vw]"
          />
        </div>
      </motion.div>
    </section>
  )
}
