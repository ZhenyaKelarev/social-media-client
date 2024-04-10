import React from "react"
import { makeStyles } from "@material-ui/styles"
import ChatSidebarUser from "../chatSidebarUser"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"

const useStyles = makeStyles({
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
})

const ChatSidebar = ({ friends, activeChat, setActiveChat }) => {
  const classes = useStyles()

  return (
    <Grid item xs={5} className={classes.borderRight500}>
      <Divider />
      <List>
        {friends.map((friend) => (
          <ChatSidebarUser
            key={friend.id}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
            friendData={friend}
          />
        ))}
      </List>
    </Grid>
  )
}

export default ChatSidebar
