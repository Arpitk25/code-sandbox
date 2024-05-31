import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ authenticated, setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login');
  };

  const buttonStyles = {
    margin: 'auto',
    background: 'linear-gradient(45deg, ##34ebeb 30%, ##34ebeb 90%)',
    color: 'white',
    borderRadius: '15px',
    boxShadow: '0 3px 5px 2px rgba(105, 105, 255, .3)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      background: 'linear-gradient(45deg, ##34ebeb 30%, ##34ebeb 90%)',
      boxShadow: '0 6px 10px 4px rgba(105, 105, 255, .3)',
      transform: 'scale(1.05)',
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        {authenticated && location.pathname === '/editor' ? (
          <Button
            color="error"
            variant="contained"
            sx={{
              marginLeft: 'auto',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '15px',
              boxShadow: '0 3px 5px 2px rgba(255, 0, 0, .3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                backgroundColor: 'darkred',
                boxShadow: '0 6px 10px 4px rgba(255, 0, 0, .3)',
                transform: 'scale(1.05)',
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              color="inherit"
              sx={buttonStyles}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={buttonStyles}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              sx={buttonStyles}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
            <Button
              color="inherit"
              sx={buttonStyles}
              component={Link}
              to="/adminlogin"
            >
              Login as Admin
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
