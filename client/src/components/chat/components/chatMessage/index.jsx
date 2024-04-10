import React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Grid from "@mui/material/Grid"

const ChatMessage = ({ message }) => {
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            align={message.userId === 1 ? "right" : "left"}
            primary={message.message}
          ></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={message.id === 1 ? "right" : "left"}
            secondary="09:30"
          ></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default ChatMessage
