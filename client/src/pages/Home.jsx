import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../redux/service/board";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Home = () => {
  const [createBoard, result] = useCreateBoardMutation();
  const navigate = useNavigate();

if(result.isSuccess){
  navigate(`/board/${result?.data?._id}`)
  result.reset();
}

  return (
    <>
      {result.isLoading ? (
        <Loading fullHeight />
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            loading={result.isLoading}
            variant="outlined"
            color="success"
            onClick={() => {
              createBoard();
            }}
          >
            Click here to create A New board
          </LoadingButton>
        </Box>
      )}
    </>
  );
};

export default Home;
