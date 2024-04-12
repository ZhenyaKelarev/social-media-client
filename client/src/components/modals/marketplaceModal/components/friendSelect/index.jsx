import React, { useContext } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { AuthContext } from "context/authContext"
import { useGetAllFriends } from "queries/relation/queries"
import { getImage } from "utils/fileManipulation"
import "./styles.scss"

const FriendSelect = ({ handleChange, selectedValue }) => {
  const { currentUser } = useContext(AuthContext)
  console.log("selectedValue", selectedValue)

  const userId = currentUser.id
  const {
    isLoading: isFriendsIsLoading,
    // isError: isFriendsIsError,
    data: friends,
  } = useGetAllFriends(userId)
  const handleSelectChange = (e) => {
    console.log("e", e.target.value)
    handleChange(e.target.value)
  }
  if (isFriendsIsLoading) return null

  if (friends.length === 0) return <h1>No friends</h1>
  return (
    <FormControl className="friend-select" fullWidth>
      <InputLabel>Choose a friend</InputLabel>
      <Select
        value={selectedValue}
        label="Choose a friend"
        onChange={handleSelectChange}
      >
        {friends.map((friend) => (
          <MenuItem value={friend.id}>
            <div className="friend-select-element">
              <div>
                <img src={getImage(friend.profilePic)} alt="default avatar" />
              </div>
              <p>{friend.name}</p>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FriendSelect
