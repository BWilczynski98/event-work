import { Button } from "@/components/ui/button"
import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom"

export const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div
        id="error-page"
        className="flex flex-col justify-center items-center h-screen text-xl font-semibold"
      >
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <Button onClick={() => navigate(-1)}>Wróc</Button>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    )
  } else {
    return <></>
  }
}
