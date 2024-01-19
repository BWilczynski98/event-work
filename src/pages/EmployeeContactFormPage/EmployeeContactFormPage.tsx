import { Center } from "@/components/Center"
import { EmployeeForm } from "@/components/Forms"
import { Toaster } from "@/components/ui/toaster"

export const EmployeeContactFormPage = () => {
  return (
    <Center>
      <div className="py-10">
        <EmployeeForm />
      </div>
      <Toaster />
    </Center>
  )
}
