import { Box, Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import assets from "../../assets";

const AuthLayout = () => {
  console.log("data")
  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={assets.images.logoDark}
          style={{ width: "100px" }}
          alt="app logo"
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
