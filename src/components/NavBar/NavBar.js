import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
    return (
    <nav>
        <Box>
        <AppBar position="fixed">
            <Toolbar sx={{ backgroundColor: '#4D4DFF' }}>
                <Typography textAlign={'center'} sx={{flexGrow:1}} variant="h5">
                    <NavLink to="/about" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >About us</NavLink>
                </Typography>
                <Typography textAlign={'center'} sx={{flexGrow:1}} variant="h5">
                    <NavLink to="/maps" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Maps</NavLink>
                </Typography>
                <Typography textAlign={'center'} sx={{flexGrow:1}} variant="h5">
                    <NavLink to="/forums" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Forums</NavLink>
                </Typography>
                <Typography variant="h4" textAlign={'center'} sx={{flexGrow:1}}>
                    <NavLink to="/" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >SportMaps</NavLink>
                </Typography>
                <Typography sx={{flexGrow:1, ml:6}} textAlign={'center'} variant="h5">
                    <NavLink to="/news" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >News</NavLink>
                </Typography>
                <Typography sx={{flexGrow:1, mr:14, ml:2}} textAlign={'center'} variant="h5">
                    <NavLink to="/coaches" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'orange', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Coaches</NavLink>
                </Typography>
                <Typography textAlign={'center'} variant="h6">
                    <NavLink to="/signin" reloadDocument
                        style={({ isActive }) =>
                        isActive
                            ? {
                                color: 'white', textDecoration:'none'
                            }
                            : { color: 'white', textDecoration:'none'  }
                        }
                    >Sign in</NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    </nav>
  );
}
