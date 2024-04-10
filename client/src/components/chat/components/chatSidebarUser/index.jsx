import React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import { getImage } from "utils/fileManipulation"

const ChatSidebarUser = ({ friendData, activeChat, setActiveChat }) => {
  const handleChangeChat = () => {
    setActiveChat(friendData.id)
  }

  return (
    <ListItem
      onClick={handleChangeChat}
      sx={{
        background: activeChat === friendData.id ? "#5271ff" : "none",
        color: activeChat === friendData.id ? "white" : "none",
      }}
    >
      <ListItemIcon>
        <Avatar src={getImage(friendData.profilePic)} alt="avatar" />
      </ListItemIcon>
      <ListItemText>{friendData.name}</ListItemText>
      <ListItemText secondary="online" align="right"></ListItemText>
    </ListItem>
  )
}

export default ChatSidebarUser
