import React from "react"

type CenterPropsType = {
  children: React.ReactNode
}

export const Center = ({ children }: CenterPropsType) => {
  return <div className="flex justify-center items-center">{children}</div>
}
