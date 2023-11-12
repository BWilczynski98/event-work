import { cn } from "@/lib/utils"
import React from "react"

type CenterPropsType = {
  className?: string
  children: React.ReactNode
}

export const Center = ({ children, className }: CenterPropsType) => {
  return <div className={cn("min-h-screen flex flex-col justify-center items-center", className)}>{children}</div>
}
