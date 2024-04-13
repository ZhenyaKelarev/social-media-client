import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import Badge from "@mui/material/Badge"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext"
import { useMutation } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { getImage } from "utils/fileManipulation"
import { useGetNotifications } from "queries/notifications/queries"
import Notifications from "components/notifications"

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)

  const { data: notificationData, isLoading } = useGetNotifications()

  const mutation = useMutation({
    mutationFn: () => {
      return makeRequest.post("/auth/logout")
    },
  })

  const handleExit = () => {
    mutation.mutate()
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    window.location.reload()
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Fakebook</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to={`/profile/${currentUser.id}`}>
          <PersonOutlinedIcon />
        </Link>
        <button>
          <ExitToAppIcon onClick={handleExit} className="icon-button" />
        </button>
        {!isLoading && (
          <Badge badgeContent={notificationData.length} color="primary">
            <Notifications notificationData={notificationData} />
          </Badge>
        )}
        <div className="user">
          <img src={getImage(currentUser.profilePic)} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
