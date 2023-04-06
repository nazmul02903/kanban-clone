import { ListItemButton, Typography } from "@mui/material";
import {  useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ board, moveCard, findCard, id }) => {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ITEM",
      item: { id: board._id, originalIndex },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, originalIndex, moveCard]
  );

  //droping ------------------
  const [, drop] = useDrop(
    {
      accept: "ITEM",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    },
    [findCard, moveCard]
  );

  return (
    <ListItemButton
      ref={(node) => drag(drop(node))}
      sx={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Typography
        variant="body2"
        fontWeight="700"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {board.icon} {board._id}
      </Typography>
    </ListItemButton>
  );
};

export default DraggableItem;
