import { ListItemButton, Typography } from "@mui/material";
import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

const DraggableItem = ({ board, index }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: board._id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
         console.log(isMouseYAboveHoveredMiddleHeight)
 
    },
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
