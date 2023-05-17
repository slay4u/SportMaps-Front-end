import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NavigationBar() {
    return (
    <>
        <nav>
        <AppBar position="absolute" color="transparent" elevation={0}>
            <Toolbar>
                <Typography textAlign={'center'} sx={{flexGrow:1, fontWeight:'bold', ml:'23%'}} variant="body1">
                    <NavLink to="/about" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >About us</NavLink>
                </Typography>
                <Typography textAlign={'center'} sx={{flexGrow:1, fontWeight:'bold'}} variant="body1">
                    <NavLink to="/maps" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Maps</NavLink>
                </Typography>
                <Typography textAlign={'center'} sx={{flexGrow:1, fontWeight:'bold'}} variant="body1">
                    <NavLink to="/forums" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Forums</NavLink>
                </Typography>
                <Typography variant="h5" textAlign={'center'} sx={{flexGrow:1, fontWeight:'bold'}}>
                    <NavLink to="/" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >SportMaps</NavLink>
                </Typography>
                <Typography textAlign={'center'} variant="body1" sx={{flexGrow:1, fontWeight:'bold'}}>
                    <NavLink to="/news" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >News</NavLink>
                </Typography>
                <Typography textAlign={'center'} variant="body1" sx={{flexGrow:1, fontWeight:'bold'}}>
                    <NavLink to="/coaches" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Coaches</NavLink>
                </Typography>
                <Typography textAlign={'center'} variant="body1" sx={{flexGrow:1, fontWeight:'bold'}}>
                    <NavLink to="/events" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? { color: 'orange', textDecoration:'none' }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Events</NavLink>
                </Typography>
                <Button sx={{
                            mr: '16%', flexGrow: 1, borderRadius: 5, width: '0.1%', height: '0.1%', backgroundColor: 'white', textTransform: 'none',
                            ':hover': {
                                bgcolor: '#4169E1'
                        }}}>
                    <NavLink to="/signin" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color:'black', textDecoration:'none', fontWeight:'bold', fontSize:15
                            }
                            : { color:'black', textDecoration:'none', fontWeight:'bold', fontSize:15 }
                        }
                    >Sign In</NavLink>
                </Button>
            </Toolbar>
        </AppBar>
        </nav>
    </>
  );
}