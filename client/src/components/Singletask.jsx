import { Card, Typography } from "@mui/material";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useDrag } from "react-dnd";

const SingleTask = ({ task }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  //drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <Card
        ref={drag}
        sx={{
          padding: "10px",
          marginBottom: "10px",
          cursor: "grab",
          opacity: isDragging ? 0 : 1,
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
