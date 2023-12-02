import { Center } from "@/components/Center"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RoutesName } from "@/routes/routes"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router-dom"

export const CollaborationPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <Center>
      <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-center">{t("collaboration.title")}</h1>
      <div className="flex space-x-4 items-center h-8 my-5">
        <Button
          className="w-32"
          asChild
        >
          <Link to={RoutesName.employeeContactForm}>{t("collaboration.employee")}</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          className="w-32"
          asChild
        >
          <Link to={RoutesName.companyContactForm}>{t("collaboration.company")}</Link>
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <h3 className="font-semibold">{t("collaboration.or")}</h3>
        <Button
          variant={"secondary"}
          onClick={() => navigate("/")}
        >
          {t("collaboration.back_to_home")}
        </Button>
      </div>
    </Center>
  )
}
