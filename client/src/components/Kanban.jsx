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
import { useParams } from "react-router-dom";
import {
  useCreateSectionMutation,
  useDeleteSectionMutation,
} from "../redux/service/board";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import SingleSection from "./SingleSec";


const Kanban = ({ sections }) => {
  const [secTitle, setSecTitle] = useState("");

  const [createSection, { isLoading: createSectionLoading }] =
    useCreateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const { boardId } = useParams();


  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <LoadingButton
          loading={createSectionLoading}
          onClick={() => createSection(boardId)}
          size="small"
        >
          Add Section
        </LoadingButton>
        <Typography variant="body2" fontWeight="700">
          {sections?.length} section(s)
        </Typography>
      </Box>
      <Divider sx={{ marginY: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "calc(100vw -400px)",
          overflowX: "auto",
          gap: 3,
        }}
      >
        <div style={{ width: "300px" }}>
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
              variant="outlined"
              size="small"
              sx={{
                color: "gray",
                "&:hover": { color: "red" },
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Card
            sx={{
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
            }}
          >
            <Typography>UNtitled</Typography>
          </Card>
          <Card
            sx={{
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
            }}
          >
            <Typography>UNtitled</Typography>
          </Card>
          <Card
            sx={{
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
            }}
          >
            <Typography>UNtitled</Typography>
          </Card>
        </div>
        {sections?.map((section) => {
          return <SingleSection key={section._id} section={section} />;
        })}
      </Box>
    </>
  );
};

export default Kanban;
