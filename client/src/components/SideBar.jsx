import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import assets from "../assets";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useLogoutMutation } from "../redux/service/auth";
import { useGetBoardsQuery } from "../redux/service/board";

import DraggableItem from "./DraggableItem";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);

  const [logout, result] = useLogoutMutation();
  const boards = useGetBoardsQuery("boards");

  const navigate = useNavigate();



  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh", "& > div": { borderRight: "none" } }}
    >
      <List
        disablePadding
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={"700"}
              sx={{ textTransform: "capitalize" }}
            >
              {user?.username}
            </Typography>
            <IconButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={"700"}
              sx={{ textTransform: "capitalize" }}
            >
              Favorites
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={"700"}
              sx={{ textTransform: "capitalize" }}
            >
              Private
            </Typography>
            <IconButton>
              <AddBoxIcon />
            </IconButton>
          </Box>
        </ListItem>
        {boards?.data?.map((board, index) => (
          <DraggableItem board={board} />
          // <ListItemButton key={board._id} sx={{ opacity: isDragging ? 0.5 : 1 }} ref={drag}>
          //   <Typography
          //     variant="body2"
          //     fontWeight="700"
          //     sx={{
          //       whiteSpace: "nowrap",
          //       overflow: "hidden",
          //       textOverflow: "ellipsis",
          //     }}
          //   >
          //     {board.icon} {board.title}
          //   </Typography>
          // </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
