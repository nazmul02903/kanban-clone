import { ListItemButton, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../redux/app/boardSlice";

const DraggableItem = ({ board, index }) => {
  console.log(index, "index");
  const allItems = useSelector((state) => state.board.items);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: board._id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      // const items = [...allItems];
      const dragItem = allItems[dragIndex];
      const newItems = allItems.slice();
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      dispatch(setBoards(newItems));
      // setItems(newItems);
      // setDragIndex(hoverIndex);
    },
    [allItems]
  );

  //droping ------------------
  const [, drop] = useDrop({
    accept: "ITEM",
    hover(item, monitor) {
      if (item.id === board._id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const { x: mouseX, y: mouseY } = monitor.getClientOffset();

      // get hover item rectangle
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      // Get hover item middle height position
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;
      console.log(dragIndex, hoverIndex);
      if (dragIndex > hoverIndex && isMouseYAboveHoveredMiddleHeight) {
        moveItem(dragIndex, hoverIndex);
        // const copied = [...allItems];
        // const dragged = copied[dragIndex];
        // copied[dragIndex] = copied[hoverIndex];
        // copied[hoverIndex] = dragged;
        // dispatch(setBoards(copied));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));
  return (
    <ListItemButton ref={ref} sx={{ opacity: isDragging ? 0.5 : 1 }}>
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
