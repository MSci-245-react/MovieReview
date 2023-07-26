import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Reviews from '../Review';

const Review = () => {

    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: purple,
          secondary: purple,
        },
      });

  const navigate = useNavigate();

  return (
    <div>
    <ThemeProvider theme={lightTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                Landing
              </Typography>
            </Button>
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Search')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                Search
              </Typography>
            </Button>
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/MyPage')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                MyPage
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    {/* <Reviews/> */}
  </div>
  );
};

export default Review;


