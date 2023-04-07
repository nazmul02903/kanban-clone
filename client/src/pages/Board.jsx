import { useGetSingleBoardQuery } from "../redux/service/board"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Box, IconButton, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Kanban from "../components/Kanban"
// import EmojiPicker from '../components/common/EmojiPicker'

const Board = () => {
    const {boardId} = useParams()
    const {data} = useGetSingleBoardQuery(boardId)

    return(
        <>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <IconButton variant='outlined' >
              <StarOutlinedIcon color='warning' />
          </IconButton>
          <IconButton variant='outlined' color='error'>
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: '10px 50px' }}>
          <Box>
            {/* emoji picker */}
            {/* <EmojiPicker icon={icon} onChange={onIconChange} /> */}
            <TextField
              value={data?.title}
            //   onChange={updateTitle}
              placeholder='Untitled'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
              }}
            />
            <TextField
              value={data?.description}
            //   onChange={updateDescription}
              placeholder='Add a description'
              variant='outlined'
              multiline
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
              }}
            />
          </Box>
          <Box>
            {/* Kanban board */}
            {/* <Kanban data={sections} boardId={boardId} /> */}
            <Kanban/>
          </Box>
        </Box>
      </>
    )
}

export default Board