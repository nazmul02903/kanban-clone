import {
  useGetSingleBoardQuery,
  useUpdateBoardMutation,
} from "../redux/service/board";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Box, IconButton, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Kanban from "../components/Kanban";
import { useEffect, useState } from "react";
// import EmojiPicker from '../components/common/EmojiPicker'

let timer;
const timeout = 500;
const Board = () => {
  const { boardId } = useParams();
  const { data, isSuccess: dataSuccess } = useGetSingleBoardQuery(boardId);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [updateBoard, result] = useUpdateBoardMutation();
  

  const updateTitle =  (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout( () => {
      console.log(result);
      updateBoard({ boardId, title:newTitle, description: desc });
    }, timeout);
  };

  useEffect(() => {
    setTitle(data?.title);
    setDesc(data?.description);
  }, [data]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton variant="outlined">
          <StarOutlinedIcon color="warning" />
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          {/* emoji picker */}
          {/* <EmojiPicker icon={icon} onChange={onIconChange} /> */}
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
            }}
          />
        </Box>
        <Box>
          <Kanban />
        </Box>
      </Box>
    </>
  );
};

export default Board;
