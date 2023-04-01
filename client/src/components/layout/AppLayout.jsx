import { Outlet } from "react-router-dom";
import { useLoadUserByTokenQuery } from "../../redux/service/auth";

const AppLayout = () => {
  const data = useLoadUserByTokenQuery(undefined);
  return <Outlet />;
};

export default AppLayout;
