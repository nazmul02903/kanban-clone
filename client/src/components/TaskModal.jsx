import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material'
import Moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import "../assets/editor.css"

const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
  }

const TaskModal = ({open, handleClose}) => {
    return(
        <Modal
        open={open}
        onClose={handleClose}
      >
          <Box sx={modalStyle}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%'
            }}>
              <IconButton variant='outlined' color='error' >
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
            <Box sx={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              padding: '2rem 5rem 5rem'
            }}>
              <TextField
                value={"untitled"}
                placeholder='Untitled'
                variant='outlined'
                fullWidth
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-input': { padding: 0 },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                  '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '700' },
                  marginBottom: '10px'
                }}
              />
              <Typography variant='body2' fontWeight='700'>
                {/* {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''} */}
              </Typography>
              <Divider sx={{ margin: '1.5rem 0' }} />
              <Box
                // ref={editorWrapperRef}
                sx={{
                  position: 'relative',
                  height: '80%',
                  overflowX: 'hidden',
                  overflowY: 'auto'
                }}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={"content"}
                />
              </Box>
            </Box>
          </Box>
      </Modal>
    )
}

export default TaskModal