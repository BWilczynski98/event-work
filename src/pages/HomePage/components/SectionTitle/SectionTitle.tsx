import { Separator } from "@/components/ui/separator"
import React from "react"

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-x-4 flex mb-12 items-center">
      <Separator
        orientation="vertical"
        className="h-12 w-2 bg-primary"
      />

      <h2 className="text-4xl">{children}</h2>
    </div>
  )
}
