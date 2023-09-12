import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"),'Email must contain @'],
  password: [(value) => value.length >= 6,'Password must have 6 or more characters'],
  displayName: [(value) => value.length >= 1,'Full name is required']
};

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const [formSubmiter, setFormSubmiter] = useState(false)

  const { status, errorMessage } = useSelector(state=>state.auth)
  const isCheckingAuthentication = useMemo(()=>{
    status === 'checking'
  },[status]);

  const { onInputChange, displayName, email, password, formState,
          isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setFormSubmiter(true)

    if(!isFormValid) return

    dispatch(startCreatingUserWithEmailPassword(formState))
  };

  return (
    <AuthLayout title={"Create account"}>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmiter}
              helperText={displayNameValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmiter}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmiter}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>

            <Grid item 
            display={!!errorMessage ? '' : 'none'}
            xs={12}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isCheckingAuthentication} variant="contained" type="submit" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
          

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Already have account? </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
