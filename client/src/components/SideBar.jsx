import {
  Box,
  Card,
  Divider,
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
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdatePositionMutation,
} from "../redux/service/board";

import { setBoards } from "../redux/app/boardSlice";
import { useCallback, useEffect } from "react";
import DemoDrag from "./DemoDragItem";

const SideBar = () => {
  //selectors ---------------
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [logout, result] = useLogoutMutation();
  const navigate = useNavigate();

  //methods ---------------------
  const [createBoard, { isSuccess: boardCreateSuccess, data: newBoard }] =
    useCreateBoardMutation();

  const [updatePosition] = useUpdatePositionMutation();

  const boards = useGetBoardsQuery("boards");




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
      const updatedArray = update(items, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      });
      dispatch(setBoards(updatedArray));
      updatePosition(updatedArray);
    },
    [findCard, items, setBoards]
  );

  useEffect(() => {
    if (boards.isSuccess) {
      dispatch(setBoards(boards.data));
      if (boardCreateSuccess) {
        navigate(`/board/${newBoard._id}`);
      }
    }
  }, [boards.isSuccess, boards?.data]);

  // useEffect(() => {
  //   dispatch(setBoards(boards?.data));
  // }, [boards?.data]);

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
        <Divider sx={{marginY: 1}}/>
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
              Boards
            </Typography>
            <IconButton
              onClick={() => {
                createBoard();
              }}
            >
              <AddBoxIcon />
            </IconButton>
          </Box>
        </ListItem>
        {items?.map((board, index) => (
            <DemoDrag
              moveCard={moveCard}
              key={board._id}
              id={board._id}
              findCard={findCard}
              board={board}
            />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
