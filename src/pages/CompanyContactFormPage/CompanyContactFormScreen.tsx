import { Center } from "@/components/Center"
import { CompanyForm } from "@/components/Forms"
import { Toaster } from "@/components/ui/toaster"

export const CompanyContactFormScreen = () => {
  return (
    <Center>
      <div className="py-10">
        <CompanyForm />
      </div>
      <Toaster />
    </Center>
  )
}
