import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateBoardMutation } from "../redux/service/board";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";

const Home = () => {
  const [createBoard, { reset, isSuccess: createSuccess, data: createData, isLoading }] =
    useCreateBoardMutation();
  const navigate = useNavigate();

  if (createSuccess) {
    const resultId = createData?._id;
    navigate(`/board/${resultId}`);
  }

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      {isLoading ? (
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
            loading={isLoading}
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
