import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Typography, Button, Grid, TextField } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: purple,
    secondary: purple,
  },
});

const Search = () => {
  let serverURL = '';
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchDirector, setSearchDirector] = React.useState('');
  const [searchActor, setSearchActor] = React.useState('');
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();

  const handleSearchTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleSearchDirectorChange = (event) => {
    setSearchDirector(event.target.value);
  };

  const handleSearchActorChange = (event) => {
    setSearchActor(event.target.value);
  };

  const getFilteredMovies = () => {
    callApigetFilteredMovies().then((res) => {
      var parsed = JSON.parse(res.express);
      setResults(parsed);
    });
  };

  const handleButtonClick = () => {
    getFilteredMovies();
  };

  const callApigetFilteredMovies = async () => {
    const url = serverURL + '/api/getFilteredMovies';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTitle: searchTitle,
        searchDirector: searchDirector,
        searchActor: searchActor,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Search')}>
                  <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                    Search
                  </Typography>
                </Button>
              </Box>
              <Box>
              <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Home
                  </Typography>
                  </Button>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Recommendations')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Recommendations
                  </Typography>
                </Button>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Review')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Review
                  </Typography>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Grid container maxWidth="xl" sx={{ mt: 4, px: 4 }}>
          <Grid item xs={12} style={{ paddingBottom: '20px' }}>
            <Typography variant="h3" color="primary">
             Search a Movie
            </Typography>
          </Grid>
          <Grid container columnSpacing={2}>
            {/* Left side: Input fields */} 
            <Grid item xs={12} md={6}>
              <Box sx={{ marginBottom: '16px' }}>
                <label>Movie Title</label>
              </Box>

              <TextField label="Movie Title" fullWidth value={searchTitle} onChange={handleSearchTitleChange} />
              <br></br>

              <Box sx={{ marginBottom: '16px' }}>
                <label>Director's Name</label>
                <br></br>
              </Box>
              
              <TextField
                label="Director Name"
                fullWidth
                value={searchDirector}
                onChange={handleSearchDirectorChange}
              />
                <br></br>
              <Box sx={{ marginBottom: '16px' }}>
                <label>Actor's Name</label>
              </Box>
              <TextField label="Actor Name" fullWidth value={searchActor} onChange={handleSearchActorChange} />
              <br></br>
              <Button
                variant="contained"
                style={{ marginLeft: 'auto', display: 'block', marginTop: '20px' }}
                onClick={handleButtonClick}
              >
                Search
              </Button>
            </Grid>

            {/* Right side: Results */}
            <Grid item xs={12} md={6}>
              <ul>
                {results.map((movie, index) => (
                  <div key={index}>
                    <p>
                      <strong>Title:</strong> {movie.movieTitle}
                    </p>
                    <p>
                      <strong>Director:</strong> {movie.DirectorNames}
                    </p>
                    {movie.ReviewContents && (
                      <div style={{ background: '#f0f0f0', padding: '8px', border: '1px solid #ccc', marginBottom: '10px' }}>
                        <strong>Reviews:</strong>
                        {movie.ReviewContents.split('\n').map((review, reviewIndex) => (
                          <p key={reviewIndex} style={{ fontSize: '14px', margin: '4px 0', paddingLeft: '20px' }}>
                            <span style={{ marginRight: '5px' }}>-</span>
                            {review}
                          </p>
                        ))}
                        <p>
                          <strong>Average Review Score:</strong> {movie.AverageReviewScore}
                        </p>
                      </div>
                    )}
                    {index !== results.length - 1 && <hr />} {/* Add a horizontal line between each result object */}
                  </div>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Search;



