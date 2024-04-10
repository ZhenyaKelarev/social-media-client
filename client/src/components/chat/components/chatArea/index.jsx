import React from "react"
import List from "@mui/material/List"
import Fab from "@mui/material/Fab"
import SendIcon from "@mui/icons-material/Send"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import ChatMessage from "../chatMessage"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  messageArea: {
    height: "58vh",
    overflowY: "auto",
  },
})

const ChatArea = ({ activeChat }) => {
  const classes = useStyles()

  const messages = [
    {
      id: 1,
      userId: 2,
      message: "Hey man, What's up ?",
    },
    {
      id: 2,
      userId: 1,
      message: "Hey, Iam Good! What about you ?",
    },
    {
      id: 3,
      userId: 2,
      message: "Cool. i am good, let's catch up!",
    },
  ]

  return (
    <Grid item xs={7}>
      <List className={classes.messageArea}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </List>
      <Divider />
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic-email"
            label={`Type to ${activeChat}`}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatArea
