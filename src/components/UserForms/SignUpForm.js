import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { LockPersonOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useSignupMutation } from "../../store/auth/authApiSlice";

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

const USERNAME_REGEX = "^(?=.{2,30}$)[A-Z][a-zA-Z]*(?:\\h+[A-Z][a-zA-Z]*)*$";
const PWD_REGEX =
  "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[{}:#@!;\\[_'`\\],\".\\/~?*\\-$^+=\\\\<>]).{8,20}$";
const EMAIL_REGEX =
  "^(?=.{1,32}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

export default function SignUp() {
  const [signup] = useSignupMutation();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setValidFirstName(firstName.match(USERNAME_REGEX));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(lastName.match(USERNAME_REGEX));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(email.match(EMAIL_REGEX));
  }, [email]);

  useEffect(() => {
    setValidPassword(password.match(PWD_REGEX));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const v1 = firstName.match(USERNAME_REGEX);
    const v2 = lastName.match(USERNAME_REGEX);
    const v3 = email.match(EMAIL_REGEX);
    const v4 = password.match(PWD_REGEX);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await signup({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");
      setSuccess(true);
      setSuccessMsg(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response?.status === 403) {
        setErrMsg("User with that email already exists.");
      } else {
        setErrMsg("Registration failed.");
      }
    }
  };

  return (
    <>
      {success ? (
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
          <Typography sx={{ textAlign: "center" }}>{successMsg}</Typography>
        </Paper>
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
                <LockPersonOutlined fontSize="large" />
              </Avatar>
              <Typography variant="h4" sx={{ color: "#9c27b0" }}>
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      label="First Name"
                      variant="outlined"
                      autoComplete="off"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      error={
                        firstName !== "" && !firstName.match(USERNAME_REGEX)
                      }
                      helperText={
                        firstName !== "" && !firstName.match(USERNAME_REGEX)
                          ? "Provide valid name, please."
                          : ""
                      }
                      sx={{ background: "#ffebee", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      label="Last Name"
                      variant="outlined"
                      autoComplete="off"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      error={lastName !== "" && !lastName.match(USERNAME_REGEX)}
                      helperText={
                        lastName !== "" && !lastName.match(USERNAME_REGEX)
                          ? "Provide valid name, please."
                          : ""
                      }
                      sx={{ background: "#ffebee", borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email"
                      variant="outlined"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={email !== "" && !email.match(EMAIL_REGEX)}
                      helperText={
                        email !== "" && !email.match(EMAIL_REGEX)
                          ? "Provide valid email, please."
                          : ""
                      }
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
                      onChange={(e) => setPassword(e.target.value)}
                      error={password !== "" && !password.match(PWD_REGEX)}
                      helperText={
                        password !== "" && !password.match(PWD_REGEX)
                          ? "Password must contain letters, numbers and special symbols. Should be at least 8 characters long."
                          : ""
                      }
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
                    disabled={
                      !validFirstName ||
                      !validLastName ||
                      !validEmail ||
                      !validPassword
                        ? true
                        : false
                    }
                    color="secondary"
                  >
                    Sign Up
                  </Button>
                </Box>
                <Typography variant="body2" align="right">
                  <NavLink
                    to="/signin"
                    reloadDocument
                    style={({ isActive }) =>
                      isActive
                        ? { color: "blue", textDecoration: "none" }
                        : { color: "blue", textDecoration: "none" }
                    }
                  >
                    Already have an account? Sign in
                  </NavLink>
                </Typography>
              </Box>
            </Box>
            <Copyright sx={{ mt: 2 }} />
          </Paper>
          <Typography
            className={errMsg ? "errmsg" : "offscreen"}
            sx={{ textAlign: "center" }}
          >
            {errMsg}
          </Typography>
        </>
      )}
    </>
  );
}
