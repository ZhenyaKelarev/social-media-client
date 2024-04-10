import React, { useContext, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import ChatSidebar from "./components/chatSidebar"
import { AuthContext } from "context/authContext"
import { useGetAllFriends } from "queries/relation/queries"
import Loader from "components/Loader"
import ChatArea from "./components/chatArea"

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "70vh",
  },
  messageArea: {
    height: "58vh",
    overflowY: "auto",
  },
})

const Chat = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser.id
  const { isLoading: isFriendsIsLoading, data: friends } =
    useGetAllFriends(userId)
  const [activeChat, setActiveChat] = useState(null)

  useEffect(() => {
    if (!isFriendsIsLoading && friends && friends.length > 0) {
      // Set the activeChat to the id of the first friend in the friends array
      setActiveChat(friends[0].id)
    }
  }, [isFriendsIsLoading, friends])

  if (isFriendsIsLoading) return <Loader />

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <ChatSidebar
          setActiveChat={setActiveChat}
          activeChat={activeChat}
          friends={friends}
        />
        <ChatArea activeChat={activeChat} />
      </Grid>
    </div>
  )
}

export default Chat
