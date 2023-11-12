import { Toaster } from "@/components/ui/toaster"

import { Navigation } from "./components/Navigation/Navigation"
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import { HomePage } from "./pages"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider>
        <Navigation />
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}
