import React from 'react';
import { Typography, Box, CssBaseline } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './Header';
import { Hero } from '../assets/images';

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${Hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '1000px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          textAlign: 'center', // Center text content
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%', // Position at 50% from the top
            left: '50%', // Position at 50% from the left
            transform: 'translate(-50%, -50%)', // Center horizontally and vertically
            zIndex: 1, // Ensure content is above the slider
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontFamily: 'Lucida Console, Monaco, monospace', fontWeight: 'bold', fontStyle: 'Bold' }}
          >
            Codesandbox
          </Typography>

          <Typography variant="body1">
          Boost Your Coding Efficiency with AI Assistance
          </Typography>
        </Box>
        <Slider {...settings} style={{ width: '100%' }}>
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              <b>Try Our IDE Today</b>
            </Typography>
            <Typography variant="body1">
            Regardless of your experience level in coding, <br />It offers a platform where you can write code and explore your creative potential.
            </Typography>
          </div>
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              AI Assistance
            </Typography>
            <Typography variant="body1">
            Unlock your coding potential with our AI-powered chatbot <br /> Meticulously crafted using cutting-edge technology from Chatbase.co. <br /> Trained on an extensive array of coding data, <br /> ur chatbot offers intuitive assistance and guidance tailored to your unique programming needs.
            </Typography>
          </div>
        </Slider>
      </Box>
    </>
  );
};

export default HomePage;
