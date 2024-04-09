import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import "./styles.scss"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const SubmitSimpleModal = ({
  openModal,
  closeModal,
  title,
  buttons,
  handleCancel,
  handleApply,
  applyText,
  cancelText,
}) => {
  return (
    <Modal
      className="submit-modal"
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box className="submit-btns">
          <div className="close-modal">
            <CloseIcon onClick={closeModal} />
          </div>

          <button className="btn-default btn-warning" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className="btn-default btn-primary" onClick={handleApply}>
            {applyText}
          </button>
        </Box>
      </Box>
    </Modal>
  )
}

export default SubmitSimpleModal
