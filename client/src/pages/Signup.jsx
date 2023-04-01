import { Box, TextField, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "../redux/service/auth";
import { useState } from "react";

const schema = yup.object({
  username: yup.string().min(6).max(25).required(),
  password: yup.string().min(6).max(25).required(),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [errAlert, setErrAlert] = useState(true);

  const [signup, { error, isLoading, isSuccess, isError }] = useSignupMutation();

  const onSubmit = (values) => {
    signup({ username: values.username, password: values.password });
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
          label="Password"
          type={"password"}
          {...register("password")}
          error={errors?.password && true}
          helperText={errors?.password?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type={"password"}
          id="confirmpassword"
          label="Confirm Password"
          {...register("confirmpassword")}
          error={errors?.confirmpassword && true}
          helperText={errors?.confirmpassword?.message}
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
          Sign Up
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        {" "}
        Already have an account? Login
      </Button>
      {isError && errAlert && (
        <Alert
          onClose={() => {
            setErrAlert(false);
          }}
          severity="error"
        >
          {error?.data?.msg ?? "Something is wrong. Try chaning User Name"}
        </Alert>
      )}
    </>
  );
};

export default SignUp;
