import { Hero } from "@/pages/HomePage/components/Hero"
import { About } from "./components/About"
import { CurrentNews } from "./components/CurrentNews"
import { OurProjects } from "./components/OurProjects"

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <CurrentNews />
      <OurProjects />
    </div>
  )
}
