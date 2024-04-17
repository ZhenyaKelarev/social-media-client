import React, { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import moment from "moment"
import { useUpdateNotifications } from "queries/notifications/queries"
import { useEffect } from "react"

const Notifications = ({ notificationData }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const updateNotifications = useUpdateNotifications()
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    updateNotifications.mutate()
  }

  console.log("notificationData", notificationData.length)

  const menuPaper = {
    "& .MuiButtonBase-root": {
      width: "300px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
    },
    "&.MuiList-root": {
      padding: "0",
    },
    "& span": {
      fontSize: "10px",
    },
  }

  return (
    <div>
      <NotificationsOutlinedIcon onClick={handleClick} />
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        autoFocus={false}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",

          sx: menuPaper,
        }}
      >
        {notificationData.length > 0 ? (
          notificationData?.map((notification) => (
            <MenuItem onClick={handleClose}>
              <div>{`${notification.fromUser.name} ${notification.eventText}`}</div>
              <span>{moment(notification.createdAt).fromNow()}</span>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>
            <p>no notifications</p>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}
export default Notifications
