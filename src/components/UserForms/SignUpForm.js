import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { NavLink } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="black" align="center" {...props}>
      {'Copyright © '}
      <NavLink to="/" reloadDocument
        style={({ isActive }) =>
        isActive
            ? {
                color: 'black'
            }
            : { color: 'black'  }
        }
      >SportMaps</NavLink>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { firstName, lastName, email, password }
    console.log(user)
        fetch("http://localhost:8090/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(user)
        }).then(() => {
          console.log("REGISTER")
        })
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ padding: '1px 25px', marginTop: "150px", width: 500, marginLeft: "-35px", borderRadius:4 }}>
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockPersonOutlinedIcon fontSize='large'/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color:"#9c27b0", fontSize:32}}>
            Sign up
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  sx={{ background: "#ffebee", borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant="outlined"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  sx={{background:"#ffebee", borderRadius:1}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  sx={{background:"#ffebee", borderRadius:1}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  sx={{background:"#ffebee", borderRadius:1}}
                />
              </Grid>
            </Grid>
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: 150, borderRadius: 5, fontSize: 15 }}
                  color='secondary'>
                    Sign Up
                </Button>
              </Box>
              <Typography variant="body2" align='right'>
                <NavLink to="/signin" reloadDocument
                  style={({ isActive }) =>
                  isActive
                      ? {
                          color: 'blue', textDecoration:'none'
                      }
                      : { color: 'blue', textDecoration:'none' }
                  }
                >Already have an account? Sign in</NavLink>
              </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}