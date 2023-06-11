import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/auth/authSlice";
import { useLoginMutation } from "../../store/auth/authApiSlice";

function Copyright(props) {
  return (
    <Typography variant="body2" color="black" align="center" {...props}>
      {"Copyright © "}
      <NavLink
        to="/"
        reloadDocument
        style={({ isActive }) =>
          isActive ? { color: "black" } : { color: "black" }
        }
      >
        SportMaps
      </NavLink>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignIn() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return isLoading ? (
    <CircularProgress/>
  ) : (
    <>
      <Paper
        sx={{
          padding: "1%",
          marginTop: "9%",
          width: "24%",
          ml: "38%",
          borderRadius: 4,
          mr: "38%",
        }}
      >
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LoginOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ color: "#9c27b0" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  autoComplete="off"
                  ref={emailRef}
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ background: "#ffebee", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPwd(e.target.value)}
                  sx={{ background: "#ffebee", borderRadius: 1 }}
                />
              </Grid>
            </Grid>
            <Box
              m={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  width: "30%",
                  borderRadius: 5,
                  fontSize: 15,
                }}
                color="secondary"
              >
                Sign In
              </Button>
            </Box>
            <Typography variant="body2" align="right">
              <NavLink
                to="/signup"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "blue",
                        textDecoration: "none",
                      }
                    : { color: "blue", textDecoration: "none" }
                }
              >
                Don&apos;t have an account? Sign up
              </NavLink>
            </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Paper>
      <Typography
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
        sx={{ textAlign: "center" }}
      >
        {errMsg}
      </Typography>
    </>
  );
}
