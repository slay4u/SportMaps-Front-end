import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import store from "../../store/store";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/authSlice";

export default function NavigationBar() {
  const role = store.getState().auth.role;
  const token = store.getState().auth.token;
  const email = store.getState().auth.email;
  const refreshToken = store.getState().auth.refreshToken;
  const [userInfo] = useState({
    role: role,
    email: email,
    refreshToken: refreshToken,
    toke: token,
  });
  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const logout = () => {
    logoutCall({ email, refreshToken });
    dispatch(logOut(userInfo));
  };

  return (
    <>
      <nav>
        <AppBar position="absolute" color="transparent" elevation={0}>
          <Toolbar>
            <Typography
              textAlign={"center"}
              sx={{ flexGrow: 1, fontWeight: "bold", ml: "11%" }}
              variant="body1"
            >
              <NavLink
                to="/about"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                About us
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              variant="body1"
            >
              <NavLink
                to="/chat"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                ChatRoom
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              variant="body1"
            >
              <NavLink
                to="/maps"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Maps
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              variant="body1"
            >
              <NavLink
                to="/forums"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Forums
              </NavLink>
            </Typography>
            <Typography
              variant="h5"
              textAlign={"center"}
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <NavLink
                to="/"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                SportMaps
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body1"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <NavLink
                to="/news"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                News
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body1"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <NavLink
                to="/coaches"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Coaches
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body1"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <NavLink
                to="/events"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Events
              </NavLink>
            </Typography>
            <Typography
              textAlign={"center"}
              variant="body1"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <NavLink
                to="/profile"
                reloadDocument
                style={({ isActive }) =>
                  isActive
                    ? { color: "orange", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" }
                }
              >
                Profile
              </NavLink>
            </Typography>
            {store.getState().auth.email ? (
              <Button
                sx={{
                  mr: "6%",
                  flexGrow: 1,
                  borderRadius: 5,
                  width: "0.1%",
                  height: "0.1%",
                  backgroundColor: "white",
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "#4169E1",
                  },
                }}
                onClick={logout}
              >
                <NavLink
                  to="/signin"
                  reloadDocument
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 15,
                        }
                      : {
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 15,
                        }
                  }
                >
                  Log Out
                </NavLink>
              </Button>
            ) : (
              <Button
                sx={{
                  mr: "6%",
                  flexGrow: 1,
                  borderRadius: 5,
                  width: "0.1%",
                  height: "0.1%",
                  backgroundColor: "white",
                  textTransform: "none",
                  ":hover": {
                    bgcolor: "#4169E1",
                  },
                }}
              >
                <NavLink
                  to="/signin"
                  reloadDocument
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 15,
                        }
                      : {
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 15,
                        }
                  }
                >
                  Sign In
                </NavLink>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </nav>
    </>
  );
}
