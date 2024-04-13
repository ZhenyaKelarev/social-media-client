import React, { useState } from "react"
import { TextField, Typography, Box } from "@mui/material"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { getImage } from "utils/fileManipulation"
import { useSendGift } from "queries/gifts/queries"
import { useAddNotification } from "queries/notifications/queries"
import GradientButton from "components/gradientButton"
import FriendSelect from "./components/friendSelect"
import { useForm } from "react-hook-form"
import "./styles.scss"

const MarketPlaceModal = ({ openModal, closeModal, marketplaceItem }) => {
  const [chooseFriend, setChooseFriend] = useState(false)
  const sendGift = useSendGift()
  const addNotification = useAddNotification()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [friendId, setFriendId] = useState(null)

  const handleChange = (id) => {
    setFriendId(id)
  }

  const closeMarketPlaceModal = () => {
    setChooseFriend(false)
    setFriendId(null)
    reset()
    closeModal()
  }
  const handleSendGift = async (data) => {
    await sendGift.mutateAsync({
      giftText: data.message,
      sendToUserId: friendId,
      giftCardId: marketplaceItem.id,
    })
    await addNotification.mutateAsync(
      {
        eventText: "send you a gift",
        toUserId: friendId,
      },
      {
        onSuccess: () => {
          closeMarketPlaceModal()
        },
        onError: () => {
          console.log("error")
        },
      }
    )
  }

  return (
    <Modal
      className="marketplace-modal"
      open={openModal}
      onClose={closeMarketPlaceModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <div className="product-info">
          <div className="product-card">
            <div class="card">
              <div class="card__content">
                <img src={getImage(marketplaceItem.img)} alt="avatar" />
              </div>
            </div>
          </div>
          <div className="product-about">
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {marketplaceItem.name}
              </Typography>
              <Typography id="modal-modal-title" variant="p" component="p">
                {marketplaceItem.description}
              </Typography>
            </div>

            {chooseFriend && (
              <div className="select-friend-wrapper">
                <FriendSelect
                  selectedValue={friendId}
                  handleChange={handleChange}
                />

                <CloseIcon
                  onClick={() => {
                    setChooseFriend(false)
                    setFriendId(null)
                  }}
                />
              </div>
            )}
            {friendId && (
              <form>
                <input
                  {...register("message", {
                    required: "message is required!",
                    maxLength: {
                      value: 50,
                      message: "message must have maximum 50 symbols",
                    },
                  })}
                  type="text"
                  placeholder="Type message for friend"
                  name="message"
                />
                {errors.message && (
                  <p className="form-warning">{errors.message.message}</p>
                )}
              </form>
            )}

            <Box className="submit-btns">
              <div className="close-modal">
                <CloseIcon onClick={closeMarketPlaceModal} />
              </div>

              <GradientButton
                disabled={chooseFriend}
                text="Buy"
                handlerClick={() => console.log("buy")}
              />
              <p>or</p>
              {chooseFriend ? (
                <GradientButton
                  disabled={!friendId}
                  text="Send gift"
                  handlerClick={handleSubmit(handleSendGift)}
                />
              ) : (
                <GradientButton
                  disabled={!!friendId}
                  text="Gift for friend"
                  handlerClick={() => setChooseFriend(true)}
                />
              )}
            </Box>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default MarketPlaceModal
