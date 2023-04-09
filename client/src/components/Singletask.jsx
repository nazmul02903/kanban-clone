import { Card, Typography } from "@mui/material";
import TaskModal from "./TaskModal";
import { useState } from "react";

const SingleTask = ({ task }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Card
        sx={{
          padding: "10px",
          marginBottom: "10px",
          cursor: "grab",
        }}
        onClick={handleOpen}
      >
        <Typography>{task?.title}</Typography>
      </Card>
      <TaskModal task={task} open={open} handleClose={handleClose} />
    </>
  );
};

export default SingleTask;
