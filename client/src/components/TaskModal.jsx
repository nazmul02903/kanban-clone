import {
  IconButton,
  Modal,
  Box,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import "../assets/editor.css";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../redux/service/board";
import { useEffect, useState } from "react";

const modalStyle = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  height: "80%",
};

let timer;
const timeout = 700;

const TaskModal = ({ open, handleClose, task }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const updateTitle = (event) => {
    clearTimeout(timer);
    const newVal = event.target.value;
    setTitle(newVal);

    timer = setTimeout(() => {
      updateTask({ taskId: task._id, title: newVal, content });
    }, timeout);
  };

  const updateContent = (event, editor) => {
    clearTimeout(timer);
    const newVal = editor.data.get();
    setContent(newVal);
    timer = setTimeout(() => {
      updateTask({ taskId: task._id, title: title, content: newVal });
    }, timeout);
  };

  useEffect(() => {
    setTitle(task?.title);
    setContent(task?.content);
  }, [task]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
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
            onClick={() => deleteTask(task._id)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            padding: "2rem 5rem 5rem",
          }}
        >
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
              "& .MuiOutlinedInput-root": {
                fontSize: "2.5rem",
                fontWeight: "700",
              },
              marginBottom: "10px",
            }}
          />
          <Typography variant="body2" fontWeight="700">
            {/* {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''} */}
          </Typography>
          <Divider sx={{ margin: "1.5rem 0" }} />
          <Box
            // ref={editorWrapperRef}
            sx={{
              position: "relative",
              height: "80%",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <CKEditor
              onChange={updateContent}
              editor={ClassicEditor}
              data={content}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
