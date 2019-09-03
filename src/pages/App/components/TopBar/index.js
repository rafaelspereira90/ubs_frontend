import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';

import Profile from '../../../../assets/profile.svg';
import Logo from '../../../../assets/bionexo-texto.png';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function TopBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
        return(
            <div className={classes.root}>
            <AppBar position="static" style={{ background: "#01CDD4"}}>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        <img src={Logo} alt="Bionexo" />
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <img src={Profile} alt="Profile" style={{ height: "30px" }} />
                    </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                </Toolbar>
            </AppBar>
            </div>
        )
    }