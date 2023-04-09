import {
  useDeleteBoardMutation,
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
const timeout = 700;
const Board = () => {
  const { boardId } = useParams();
  const { data:board, isSuccess: dataSuccess } = useGetSingleBoardQuery(boardId);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const [updateBoard, result] = useUpdateBoardMutation();
  const [deleteBoard, { isSuccess: delSuccess }] = useDeleteBoardMutation();

  const updateTitle = (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(() => {
      console.log(result);
      updateBoard({ boardId, title: newTitle });
    }, timeout);
  };

  const updateDescription = (e) => {
    clearTimeout(timer);
    const newDesc = e.target.value;
    setDesc(newDesc);

    timer = setTimeout(() => {
      console.log(result);
      updateBoard({ boardId, description: newDesc });
    }, timeout);
  };

  useEffect(() => {
    setTitle(board?.title);
    setDesc(board?.description);
  }, [board]);

  if (delSuccess) {
    navigate("/");
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",

          width: "100%",
        }}
      >
      
        <IconButton
          variant="outlined"
          color="error"
          onClick={() => {
            deleteBoard(boardId);
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
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
            onChange={updateDescription}
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
          <Kanban sections={board?.sections ?? []} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
