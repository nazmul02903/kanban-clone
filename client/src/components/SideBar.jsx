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
import update from "immutability-helper";
import assets from "../assets";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useLogoutMutation } from "../redux/service/auth";
import { useGetBoardsQuery } from "../redux/service/board";

import DraggableItem from "./DraggableItem";
import { setBoards } from "../redux/app/boardSlice";
import { useCallback, useEffect } from "react";
import DemoDrag from "./DemoDragItem";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [logout, result] = useLogoutMutation();
  const boards = useGetBoardsQuery("boards", {
    onSuccess: (res) => {
      dispatch(setBoards(res.data));
    },
  });

  const navigate = useNavigate();

  // if (boards.isSuccess) {
  //   dispatch(setBoards(boards.data));
  // }

  useEffect(() => {
    if (boards.isSuccess) {
      dispatch(setBoards(boards.data));
    }
  }, [boards.isSuccess]);

  const findCard = useCallback(
    (id) => {
      const card = items.filter((c) => `${c._id}` === id)[0];
      return {
        card,
        index: items.indexOf(card),
      };
    },
    [items]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      dispatch(
        setBoards(
          update(items, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          })
        )
      );
    },
    [findCard, items, setBoards]
  );

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
        {items?.map((board, index) => (
          // <DraggableItem
          //   key={board._id}
          //   moveCard={moveCard}
          //   findCard={findCard}
          //   board={board}
          // />
          <DemoDrag
            moveCard={moveCard}
            key={board._id}
            id={board._id}
            findCard={findCard}
            text={board._id}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
