/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { t } from "i18next"
import React, { useEffect, useState } from "react"

type DriveLicenseType = {
  form: any
}

export const DriveLicense: React.FC<DriveLicenseType> = ({ form }) => {
  const { control, getValues } = form
  const [categoryFieldIsDisabled, setCategoryFieldIsDisabled] = useState(true)

  useEffect(() => {
    setCategoryFieldIsDisabled(getValues("driveLicense") === "no")
  }, [getValues])
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="driveLicense"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t("employee_contact_form.driverLicense")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value={"yes"}
                      onClick={() => setCategoryFieldIsDisabled(false)}
                    />
                  </FormControl>
                  <FormLabel>{t("employee_contact_form.have")}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value={"no"}
                      onClick={() => setCategoryFieldIsDisabled(true)}
                    />
                  </FormControl>
                  <FormLabel>{t("employee_contact_form.doNotHave")}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="driveLicenseCategory"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={t("employee_contact_form.licenseCategory")}
                {...field}
                disabled={categoryFieldIsDisabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
