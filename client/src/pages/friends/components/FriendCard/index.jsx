import React, { useState } from "react"
import { getImage } from "utils/fileManipulation"
import { Link } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Dropdown } from "@mui/base/Dropdown"
import { MenuButton } from "@mui/base/MenuButton"
import { Menu } from "@mui/base/Menu"
import { MenuItem } from "@mui/base/MenuItem"
import MenuSimple from "components/contextMenu"
import "./style.scss"

const FriendCard = ({ friendData }) => {
  const [contextOpened, setContextOpened] = useState(false)
  const handleContextMenu = (text) => {
    console.log("123")
    // setContextOpened((prev) => !prev)
  }
  return (
    <div className="friend-card">
      <Link className="friend-info" to={`/profile/${friendData.id}`}>
        <img src={getImage(friendData.profilePic)} alt="default avatar" />
        <span>{friendData.name}</span>
      </Link>
      <button onClick={handleContextMenu} className="context-menu">
        <MoreVertIcon />
        {contextOpened && (
          <div className="context-menu-window">
            <button className="button btn-primary">share gift</button>
            <button className="button btn-warning">delete friend</button>
          </div>
        )}
      </button>
      <MenuSimple />
      {/* <Dropdown>
        <MenuButton>
          <MoreVertIcon />
        </MenuButton>
        <Menu>
          <MenuItem onClick={handleContextMenu()}>Profile</MenuItem>
          <MenuItem onClick={handleContextMenu("Language settings")}>
            Language settings
          </MenuItem>
          <MenuItem onClick={handleContextMenu("Log out")}>Log out</MenuItem>
        </Menu>
      </Dropdown> */}
    </div>
  )
}

export default FriendCard
