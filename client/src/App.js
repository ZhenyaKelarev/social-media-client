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
import Friends from "pages/friends/Friends"
import ChatPage from "pages/chat"

function App() {
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
            <div className="outlet" style={{ flex: 6 }}>
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

  const ProtectedLoginRoute = ({ children }) => {
    if (token) {
      return <Navigate to="/" replace />
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
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/chat",
          element: <ChatPage />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
      errorElement: <Page404 />,
    },

    {
      path: "/login",
      element: (
        <ProtectedLoginRoute>
          <Login />
        </ProtectedLoginRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedLoginRoute>
          <Register />
        </ProtectedLoginRoute>
      ),
    },
    {
      path: "*",
      element: <Page404 />,
      errorElement: <Page404 />,
    },
  ])

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App
