import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
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

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password, email, occupation, age }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User created successfully');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <>
    <Header />
    <RootContainer>
      <Container maxWidth="xs">
        <FormContainer>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign up
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="occupation"
              select
              label="Occupation"
              value={occupation}
              onChange={handleOccupationChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              autoComplete="age"
              type="number"
              value={age}
              onChange={handleAgeChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={buttonStyles} // Apply button styles here
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              color="primary"
              onClick={() => navigate('/login')}
              style={{ marginTop: '8px', color: 'black' }}
            >
              Already Have An Account? Sign In
            </Button>
          </form>
        </FormContainer>
      </Container>
    </RootContainer>
    </>
  );
};

export default Signup;
