import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import assets from "../assets";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/service/auth";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);

  const [logout, result] = useLogoutMutation();

  console.log(result);
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
        <ListItemButton>
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
            <Toolbar title="Log Out">
              <IconButton
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </Box>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideBar;
