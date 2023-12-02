import { Navigation } from "./components/Navigation/Navigation"
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import { ContextStore } from "./context/navigationRefsContext"
import { HomePage } from "./pages"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <ContextStore>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </ContextStore>
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
