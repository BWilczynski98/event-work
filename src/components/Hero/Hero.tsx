import { RoutesName } from "@/routes/routes"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import MyImage from "../../assets/undraw_collaboration_re_vyau.svg"
import { Button } from "../ui/button"

export const Hero = () => {
  const { t } = useTranslation()
  return (
    <section className="h-[80dvh] overflow-hidden">
      <motion.div
        className="h-full flex justify-center items-center lg:justify-evenly px-4"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-8 max-w-xl">
          <h1 className="text-4xl font-semibold">{t("hero.title")}</h1>
          <h2>{t("hero.subtitle")}</h2>
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
