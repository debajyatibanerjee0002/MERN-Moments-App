import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LocakOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Icon from "./icon";
import { authAsync, signupAsync, signinAsync } from "../../store/actions/auth";

import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signupAsync(formData, navigate));
    } else {
      dispatch(signinAsync(formData, navigate));
    }
  };
  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const showPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchModeHandler = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    //----------------check------------
    // showPasswordHandler(false)
  };

  const googleSuccessHandler = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(authAsync({ data: { result, token } }));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailureHandler = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LocakOutlinedIcon />
        </Avatar>
        <Typography variant="h6">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  changeHandler={changeHandler}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  changeHandler={changeHandler}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              changeHandler={changeHandler}
              type="email"
            />
            <Input
              name="password"
              label="password"
              changeHandler={changeHandler}
              showPasswordHandler={showPasswordHandler}
              type={showPassword ? "text" : "password"}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                changeHandler={changeHandler}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccessHandler}
            onFailure={googleFailureHandler}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchModeHandler}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
