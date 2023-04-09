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
import SingleSection from "./SingleSec";

import "../assets/customScroll.css"

const Kanban = ({ sections }) => {
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
          width: "calc(100vw - 400px)",
          overflowX: "auto",
          gap: 3,
        }}
      >
        {sections?.map((section) => {
          return <SingleSection key={section._id} section={section} />;
        })}
      </Box>
    </>
  );
};

export default Kanban;
