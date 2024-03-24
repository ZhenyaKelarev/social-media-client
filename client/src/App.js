import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import LeftBar from "./components/leftBar/LeftBar"
import RightBar from "./components/rightBar/RightBar"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Page404 from "./pages/404"
import "./style.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import { AuthContext } from "./context/authContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const { currentUser } = useContext(AuthContext)
  const token = localStorage.getItem("accessToken")
  const { darkMode } = useContext(DarkModeContext)
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <Page404 />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      ),
    },
    {
      path: "/register",
      element: (
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      ),
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
