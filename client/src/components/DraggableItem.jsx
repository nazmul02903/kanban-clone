import { ListItemButton, Typography } from "@mui/material";
import { useDrag } from "react-dnd";

const DraggableItem = ({ board }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "type",
    item: board._id,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItemButton ref={drag} sx={{ opacity: isDragging ? 0.5 : 1 }}>
      <Typography
        variant="body2"
        fontWeight="700"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {board.icon} {board.title}
      </Typography>
    </ListItemButton>
  );
};

export default DraggableItem;
