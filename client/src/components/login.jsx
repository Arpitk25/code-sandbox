import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Wallpaper } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const RootContainer = styled('div')({
  backgroundImage: `url(${Wallpaper})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormContainer = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const buttonStyles = {
  margin: 'auto',
  background: 'linear-gradient(45deg, #000000 30%, #000000 90%)',
  color: 'white',
  borderRadius: '15px',
  boxShadow: '0 3px 5px 2px rgba(105, 105, 255, .3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    background: 'linear-gradient(45deg, #000000 30%, #000000 90%)',
    boxShadow: '0 6px 10px 4px rgba(105, 105, 255, .3)',
    transform: 'scale(1.05)',
  },
};

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        alert('Login Successful');
        navigate('/editor');
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Header/>
      <RootContainer>
        <Container maxWidth="xs">
          <FormContainer>
            <Typography variant="h5" component="h1" gutterBottom>
              Sign in
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={buttonStyles} // Apply button styles here
                style={{ marginTop: '16px' }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                color="primary"
                onClick={() => navigate('/signup')}
                style={{ marginTop: '8px', color: 'black' }}
              >
                Create An Account! Sign up now
              </Button>
            </form>
          </FormContainer>
        </Container>
      </RootContainer>
    </> 
  );
};

export default Login;
