/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, createRef, useContext, useRef } from "react"

interface NavigationRefsContextType {
  aboutRef: React.RefObject<HTMLElement>
  currentNews: React.RefObject<HTMLElement>
  ourProjects: React.RefObject<HTMLElement>
}

const NavigationRefsContext = createContext<NavigationRefsContextType>({
  aboutRef: createRef(),
  currentNews: createRef(),
  ourProjects: createRef(),
})

export const ContextStore = ({ children }: { children: ReactNode }) => {
  const aboutRef = useRef<HTMLElement>(null)
  const currentNews = useRef<HTMLElement>(null)
  const ourProjects = useRef<HTMLElement>(null)
  return (
    <NavigationRefsContext.Provider value={{ aboutRef, currentNews, ourProjects }}>
      {children}
    </NavigationRefsContext.Provider>
  )
}

export const useNavigationRefsContext = () => useContext(NavigationRefsContext)
