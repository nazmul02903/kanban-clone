import { Box, TextField, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../redux/service/auth";
import { useState } from "react";

const schema = yup.object({
  username: yup.string().min(6).max(25).required(),
  password: yup.string().min(6).max(25).required(),
});

const Login = () => {
  const [login, { isLoading, isSuccess, error, isError }] =
    useLoginMutation();
  const [errAlert, setErrAlert] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    setErrAlert(true);
    login(values);
  };
  if (isSuccess) {
    navigate("/");
  }

  return (
    <>
      <Box component={"form"} sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="UserName"
          {...register("username")}
          error={errors?.username && true}
          helperText={errors?.username?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="Password"
          type="password"
          label="Password"
          {...register("password")}
          error={errors?.password && true}
          helperText={errors?.password?.message}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          color="success"
          type="submit"
          fullWidth
          loading={isLoading}
        >
          {" "}
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
        {" "}
        Don't have an account? Signup
      </Button>
      {isError && errAlert && (
        <Alert
          onClose={() => {
            setErrAlert(false);
          }}
          severity="error"
        >
          {error?.data?.msg}
        </Alert>
      )}
    </>
  );
};

export default Login;
