import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import movie2 from '../../../src/movie2.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: purple,
      secondary: purple,
    },
  });

  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/')}>
                  <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                    Home
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Search')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Search
                  </Typography>
                </Button>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Review')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Review
                  </Typography>
                </Button>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Recommendations')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Recommendations
                  </Typography>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <div style={{ backgroundImage: `url(${movie2})`, backgroundSize: 'cover', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
              <Typography variant="h3" component="h1" align="center" gutterBottom color="primary">
                Welcome to Rozalin's Movie Site!
              </Typography>
              <Typography variant="h6" component="p" align="center" gutterBottom color="primary">
                We provide a platform to search for movies and read reviews from other users.
                <br />
                Additionally, you can submit your own movie reviews and discover top recommended movies.
              </Typography>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Landing;
