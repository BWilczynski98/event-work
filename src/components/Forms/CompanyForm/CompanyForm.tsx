import { AreaCode } from "@/components/AreaCode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import allAreaCodes from "../../../json/countries_en.json"
import "yup-phone-lite"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export const CompanyForm = () => {
  /**
   * Fake loading state
   */
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { toast } = useToast()

  /**
   * Helpers for rendering checkboxs
   */
  const collaborationTypes = [
    {
      id: "recruitmentAssistance",
      label: t("company_contact_form.collaboration_type.recruitment_assistance"),
    },
    {
      id: "projectSupport",
      label: t("company_contact_form.collaboration_type.project_support"),
    },
    {
      id: "another",
      label: t("company_contact_form.collaboration_type.another"),
    },
  ]

  /**
   * Schema is here because i18next does not
   * render correctly if it is not
   * used with the useTranslation hook
   */

  const companyContactSchemaForm = yup.object().shape({
    name: yup.string().required(t("errors.required")),
    email: yup.string().email(t("errors.email-invalid")).required(),
    areaCode: yup.string().required(t("errors.required")),
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

    linkedInUrl: yup.string(),
    instagramUrl: yup.string(),
    anotherWebSources: yup.string(),
    items: yup.array().of(yup.string()).min(0, "You have to select at least one item."),
    description: yup.string(),
  })

  /** Type of schema */

  type CompanyContactSchemaFormType = yup.InferType<typeof companyContactSchemaForm>

  /** RHF settings */
  const form = useForm<CompanyContactSchemaFormType>({
    resolver: yupResolver(companyContactSchemaForm),
    defaultValues: {
      name: "",
      email: "",
      areaCode: "+48",
      phoneNumber: "",
      linkedInUrl: "",
      instagramUrl: "",
      anotherWebSources: "",
      description: "",
      items: [],
    },
  })

  const { formState } = form
  const { errors } = formState

  const onSubmit: SubmitHandler<CompanyContactSchemaFormType> = (data: CompanyContactSchemaFormType) => {
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
    setTimeout(() => {
      setIsLoading(true)
    }, 0)

    setTimeout(() => {
      openToast({
        title: t("labels.success"),
        description: t("company_contact_form.send_data"),
      })
      alert(JSON.stringify(data))
    }, 2000)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    /**
     * Here write in the future function to handle endpoint
     */
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("company_contact_form.card_label")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.name")} *</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.email")} *</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone number fields */}
            <div className="space-y-2">
              <div>
                <Label
                  className={cn("", {
                    "text-destructive": errors.areaCode || errors.phoneNumber,
                  })}
                >
                  {t("company_contact_form.phoneNumber")} *
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
                    <FormItem>
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

            <FormField
              control={form.control}
              name="linkedInUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.linkedIn")}</FormLabel>
                  <FormControl>
                    <>
                      <Input {...field} />
                      <FormDescription>{t("company_contact_form.linkedIn_desc")}</FormDescription>
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.instagram")}</FormLabel>
                  <FormControl>
                    <>
                      <Input {...field} />
                      <FormDescription>{t("company_contact_form.linkedIn_desc")}</FormDescription>
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anotherWebSources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.another_sources")}</FormLabel>
                  <FormControl>
                    <>
                      <Input {...field} />
                      <FormDescription>{t("company_contact_form.another_sources_desc")}</FormDescription>
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">{t("company_contact_form.type_of_collaboration")}</FormLabel>
                  </div>
                  {collaborationTypes.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange(field.value && [...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company_contact_form.description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Buttons */}
            <div className="flex justify-end items-center space-x-4">
              <Button
                variant={"ghost"}
                type="button"
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
