import { Card, Typography } from "@mui/material";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const SingleTask = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.board);

  return (
    <>
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              padding: "10px",
              marginBottom: "10px",
              cursor: "grab",
              // opacity:  1,
            }}
            onClick={handleOpen}
          >
            <Typography>{task?.title}</Typography>
          </Card>
        )}
      </Draggable>
      <TaskModal task={task} open={open} handleClose={handleClose} />
    </>
  );
};

export default SingleTask;
