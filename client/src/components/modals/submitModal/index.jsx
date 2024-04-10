import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import "./styles.scss"

const SubmitSimpleModal = ({
  openModal,
  closeModal,
  title,
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
