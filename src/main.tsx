import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import "./locales/i18n.ts"
import { CollaborationPage, CompanyContactFormScreen, EmployeeContactFormPage, ErrorPage } from "./pages/index.ts"
import { RoutesName } from "./routes/routes.ts"

const router = createBrowserRouter([
  {
    path: RoutesName.home,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collaboration",
    element: <CollaborationPage />,
  },
  {
    path: RoutesName.companyContactForm,
    element: <CompanyContactFormScreen />,
  },
  {
    path: RoutesName.employeeContactForm,
    element: <EmployeeContactFormPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
