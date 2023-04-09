import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useDeleteSectionMutation,
  useUpdateSectionMutation,
} from "../redux/service/board";
import SingleTask from "./Singletask";

let timer;
const timeout = 700;

const SingleSection = ({ section }) => {
  const [secTitle, setSecTitle] = useState("");
  const [deleteSection] = useDeleteSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [createTask] = useCreateTaskMutation();

  const updateSec = (event) => {
    clearTimeout(timer);
    const newVal = event.target.value;
    setSecTitle(newVal);

    timer = setTimeout(() => {
      updateSection({ sectionId: section._id, title: newVal });
    }, timeout);
  };

  useEffect(() => {
    setSecTitle(section.title);
  }, [section]);
  return (
    <div key={section._id} style={{ width: "300px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          width: "300px"
        }}
      >
        <TextField
          placeholder="Untitled"
          value={secTitle}
          onChange={updateSec}
          variant="outlined"
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-input": { padding: 0 },
            "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
            "& .MuiOutlinedInput-root": {
              fontSize: "1rem",
              fontWeight: "700",
            },
          }}
        />
        <IconButton
          variant="outlined"
          size="small"
          sx={{
            color: "gray",
            "&:hover": { color: "green" },
          }}
          onClick={() => {
            createTask(section._id);
          }}
        >
          <AddBoxIcon />
        </IconButton>
        <IconButton
          size="small"
          variant="outlined"
          sx={{
            color: "gray",
            "&:hover": { color: "red" },
          }}
          onClick={() => {
            deleteSection(section?._id);
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      {section?.tasks &&
        section.tasks.map((task) => <SingleTask task={task} key={task._id} />)}
    </div>
  );
};

export default SingleSection;
