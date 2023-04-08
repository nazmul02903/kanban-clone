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
import { useCreateSectionMutation } from "../redux/service/board";

const Kanban = ({ sections }) => {
  console.log(sections, "sections");
  const [createSection, result] = useCreateSectionMutation();
  console.log(result);
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
        <Button onClick={() => createSection(boardId)} size="small">
          Add Section
        </Button>
        <Typography variant="body2" fontWeight="700">
          5 sections
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
        {sections?.map((section) => (
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
          </div>
        ))}
      </Box>
    </>
  );
};

export default Kanban;
