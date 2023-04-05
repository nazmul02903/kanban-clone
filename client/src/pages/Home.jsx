import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useCreateBoardMutation,
  useGetBoardsQuery,
} from "../redux/service/board";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const { data, isSuccess, isLoading } = useGetBoardsQuery("board");
  const [createBoard, result] = useCreateBoardMutation();
  const { boardId } = useParams();
  const navigate = useNavigate();

  if (result.isSuccess) {
    navigate(`/board/${result?.data?._id}`);
  }

  if (isSuccess && boardId === undefined) {
    navigate(`/board/${data[0]._id}`);
  }

  return (
    <>
      isLoading ? <Loading fullHeight /> : (
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
          Click here to create your first board
        </LoadingButton>
      </Box>
      )
    </>
  );
};

export default Home;
