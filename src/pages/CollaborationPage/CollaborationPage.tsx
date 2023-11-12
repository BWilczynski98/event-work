import { Center } from "@/components/Center"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RoutesName } from "@/routes/routes"
import { Link, useNavigate } from "react-router-dom"

export const CollaborationPage = () => {
  const navigate = useNavigate()
  return (
    <Center>
      <h1 className="text-3xl font-bold tracking-wider">Chce nawiązać współpracę jako</h1>
      <div className="flex space-x-4 items-center h-8 my-5">
        <Button
          className="w-32"
          asChild
        >
          <Link to={RoutesName.employeeContactForm}>Pracownik</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          className="w-32"
          asChild
        >
          <Link to={RoutesName.companyContactForm}>Firma</Link>
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <h3 className="font-semibold">Lub</h3>
        <Button
          variant={"secondary"}
          onClick={() => navigate("/")}
        >
          Powrót do strony głównej
        </Button>
      </div>
    </Center>
  )
}
