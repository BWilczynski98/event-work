import { AreaCode } from "@/components/AreaCode"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FancyMultiSelect } from "@/components/ui/multi-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import allAreaCodes from "../../../json/countries_en.json"
import { DriveLicense } from "./DriveLicense"
import { pl, enGB } from "date-fns/locale"
import i18next from "i18next"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/api/firebase"

export const EmployeeForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { toast } = useToast()
  const [selectedLng, setSelectedLng] = useState([])

  /**
   * Schema is here because i18next does not
   * render correctly if it is not
   * used with the useTranslation hook
   */

  const employeeContactSchemaForm = yup.object().shape({
    firstName: yup.string().required(t("errors.required")),
    lastName: yup.string().required(t("errors.required")),
    city: yup.string(),
    street: yup.string(),
    email: yup.string().email(t("errors.email-invalid")),
    postalCode: yup.string(),
    dateOfBirth: yup.date().required(t("errors.required")),
    areaCode: yup.string(),
    phoneNumber: yup.string().test({
      name: "phone-validation",
      test: function (value, { createError, path }) {
        const areaCode = this.parent.areaCode
        const code = allAreaCodes.find((item) => item.dialCode === areaCode)

        const phoneIsInvalid = yup
          .string()
          .phone(code?.isoCode, "")
          .isValidSync(value)

        if (!value) {
          return createError({ path, message: t("errors.required") })
        }

        if (!phoneIsInvalid) {
          return createError({ path, message: t("errors.invalid_phone_numer") })
        } else {
          return true
        }
      },
    }),
    languages: yup.array().of(yup.string()).min(1, "Wymagane minimum jeden język"),
    driveLicense: yup.string().required(t("errors.required")),
    driveLicenseCategory: yup
      .string()
      .when("driveLicense", { is: "yes", then: (schema) => schema.required(t("errors.required")) }),
  })

  /** Type of schema */

  type EmployeeContactSchemaFormType = yup.InferType<typeof employeeContactSchemaForm>

  /** RHF settings */
  const form = useForm<EmployeeContactSchemaFormType>({
    resolver: yupResolver(employeeContactSchemaForm),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      street: "",
      email: "",
      postalCode: "",
      dateOfBirth: undefined,
      areaCode: "+48",
      phoneNumber: "",
      languages: [],
      driveLicense: "no",
      driveLicenseCategory: "",
    },
  })
  const { formState } = form
  const { errors } = formState

  useEffect(() => {
    form.setValue("languages", selectedLng)
  }, [selectedLng])

  const onSubmit: SubmitHandler<EmployeeContactSchemaFormType> = async (data: EmployeeContactSchemaFormType) => {
    type ToastType = {
      variant?: "default" | "destructive"
      title: string
      description: string
    }

    const openToast = ({ variant, title, description }: ToastType) => {
      toast({
        variant,
        title,
        description,
      })
    }
    setIsLoading(true)
    await addDoc(collection(db, "employee"), data)
      .then(() =>
        openToast({
          title: t("labels.success"),
          description: t("company_contact_form.send_data"),
        })
      )
      .catch(() =>
        openToast({
          title: t("labels.error"),
          description: t("company_contact_form.error_send_data"),
          variant: "destructive",
        })
      )
      .finally(() => setIsLoading(false))
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{t("employee_contact_form.card_label")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.firstName")} *</FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.lastName")} *</FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col md:col-span-2">
                  <FormLabel>{t("employee_contact_form.dateOfBirth")} *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t("employee_contact_form.pickDate")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        locale={i18next.language === "pl" ? pl : enGB}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.city")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.street")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.postalCode")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employee_contact_form.email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone number fields */}
            <div className="space-y-2 basis-full sm:basis-1/2">
              <div>
                <Label
                  className={cn("", {
                    "text-destructive": errors.areaCode || errors.phoneNumber,
                  })}
                >
                  {t("employee_contact_form.phoneNumber")} *
                </Label>
              </div>
              <div className="flex space-x-4">
                {/* Prefix */}
                <FormField
                  control={form.control}
                  name="areaCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AreaCode
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Rest of number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder=""
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Phone number error message */}
              {errors.areaCode || errors.phoneNumber ? (
                <div>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="languages"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("employee_contact_form.languages")}</FormLabel>
                    <FormControl>
                      <FancyMultiSelect onChange={setSelectedLng} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <DriveLicense form={form} />
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center space-x-4 col-span-2">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => navigate(-1)}
              >
                {t("labels.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wysyłanie
                  </>
                ) : (
                  <> {t("labels.send")}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
