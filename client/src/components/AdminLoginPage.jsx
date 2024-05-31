// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Wallpaper from '../assets/images/Wallpaper.jpg'; // Adjust the import according to your file structure

// const RootContainer = styled('div')({
//   backgroundImage: `url(${Wallpaper})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   minHeight: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

// const FormContainer = styled('div')({
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   padding: '2rem',
//   borderRadius: '8px',
//   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//   textAlign: 'center',
// });

// const AdminLoginPage = ({ onAdminLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Hardcoded admin credentials
//     const adminUsername = 'admin';
//     const adminPassword = 'password';

//     if (username === adminUsername && password === adminPassword) {
//       setError('');
//       onAdminLogin(); // Call the function to handle successful admin login
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <RootContainer>
//       <Container maxWidth="xs">
//         <FormContainer>
//           <Typography variant="h5" component="h1" gutterBottom>
//             Admin Sign in
//           </Typography>
//           {error && <Typography color="error">{error}</Typography>}
//           <form onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={username}
//               onChange={handleUsernameChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               style={{ marginTop: '16px' }}
//             >
//               Sign In
//             </Button>
//           </form>
//         </FormContainer>
//       </Container>
//     </RootContainer>
//   );
// };

// export default AdminLoginPage;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Wallpaper from '../assets/images/Wallpaper.jpg'; // Adjust the import according to your file structure
import { Navigate } from 'react-router-dom'; // Import Navigate component
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

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'password';

    if (username === adminUsername && password === adminPassword) {
      setError('');
      setLoggedIn(true); // Set loggedIn state to true upon successful login
    } else {
      setError('Invalid username or password');
    }
  };

  // If logged in, redirect to /admin
  if (loggedIn) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
    <Header />
    <RootContainer>
      
      <Container maxWidth="xs">
        <FormContainer>
          <Typography variant="h5" component="h1" gutterBottom>
            Admin Sign in
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
          </form>
        </FormContainer>
      </Container>
    </RootContainer>
    </>
  );
};

export default AdminLoginPage;

