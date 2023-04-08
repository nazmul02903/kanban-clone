import { ListItem, Card } from "@mui/material";
import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Link, useParams } from "react-router-dom";
import assets from "../assets";


export const DemoDrag = memo(function Card({ id, board, moveCard, findCard }) {
  const originalIndex = findCard(id).index;
  const {boardId} = useParams()
  const style = {
    // border: "1px dashed gray",
    padding: "0.3rem 1rem",
    marginBottom: ".3rem",
    color: "white",
    cursor: "grab",
    borderRadius: "5px",
    backgroundColor: id !== boardId ? assets.colors.primary : "gray"
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "card",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;
  return (
    <ListItem
      component={Link}
      to={`/board/${board._id}`}
      ref={(node) => drag(drop(node))}
      style={{ ...style, opacity }}
    >
      {board.icon} {board.title}
    </ListItem>
  );
});

export default DemoDrag;
