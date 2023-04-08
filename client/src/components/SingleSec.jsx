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
import { useState } from "react";
import { useDeleteSectionMutation } from "../redux/service/board";

let timer;
const timeout = 700;

const SingleSection = ({ section }) => {
  const [secTitle, setSecTitle] = useState("");
  const [deleteSection] = useDeleteSectionMutation();

  const updateSection = (event, sectionId) => {
    clearTimeout(timer);

    const timer = setTimeout(() => {});
  };
  return (
    <div key={section._id} style={{ width: "300px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <TextField
          placeholder="Untitled"
          value={section?.title}
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
    </div>
  );
};

export default SingleSection;
