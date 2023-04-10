import { Card, Typography } from "@mui/material";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveDraggedItem } from "../redux/app/boardSlice";

const SingleTask = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.board);

  //drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { sectionId: task.section._id, title: task.title, id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [_, drop] = useDrop(() => ({
    accept: "task",
    hover: ({ sectionId, id: draggedId, title }) => {
      if (draggedId !== task._id) {
        console.log(draggedId, sectionId);
        console.log(task);
        dispatch(moveDraggedItem({draggedId, sectionId, task,title }));
      }
    },
  }));

  return (
    <>
      <Card
        ref={(node) => drag(drop(node))}
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
