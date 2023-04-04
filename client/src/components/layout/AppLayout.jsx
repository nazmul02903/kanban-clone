import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/app/authSlice";
import { useLoadUserByTokenQuery } from "../../redux/service/auth";
import Loading from "../Loading";
import { Box } from "@mui/material";
import SideBar from "../SideBar";

const AppLayout = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoading, data, isFetching, isSuccess } =
    useLoadUserByTokenQuery(undefined);
  console.log(data);

  if (!data && !isFetching) {
    navigate("/login");
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess]);

  return isLoading ? (
    <Loading fullHeight />
  ) : (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
