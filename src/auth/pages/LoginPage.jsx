import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";

import { checkingAuthentication, startGoogleSignIn } from "../../store/auth/";

export const LoginPage = () => {

  const { status } = useSelector(state=> state.auth)

  const dispatch = useDispatch()
  const {onInputChange, email, password } = useForm({
    email:'martin@google.com',
    password:'12345'
  })

  const isAuthenticating = useMemo(()=> status === 'checking', [status])

const onSubmit =(event)=>{
  event.preventDefault()

  dispatch(checkingAuthentication())
}

const onGoogleSignIn = ()=>{
  dispatch(startGoogleSignIn())

}


  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Email" type="email" name="email" value={email}fullWidth  onChange={onInputChange}/>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Password" type="password" name="password" value={password} onChange={onInputChange} fullWidth />
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
               disabled={isAuthenticating}
               variant="contained" 
               type="submit" 
               fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
              disabled={isAuthenticating}
              variant="contained" 
              fullWidth
              onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
