import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

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
      </ThemeProvider>
    </div>
  );
};

export default Landing;
