import React, { useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Call } from '@mui/icons-material';

const Search = () => {

    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: purple,
          secondary: purple,
        },
  });

  let serverURL = "";

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
    callApigetFilteredMovies()
    .then(res => {
      var parsed = JSON.parse(res.express);
      // console.log("callApiLoadRecipes parsed: ", parsed)
      setResults(parsed);
      console.log("res: ", res)
      })
  }

  const handleButtonClick = () => {
   
    getFilteredMovies();
  }

  const callApigetFilteredMovies = async () => {
    const url = serverURL + "/api/getFilteredMovies";
   
     const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
        searchTitle: searchTitle,
        searchDirector: searchDirector,
        searchActor: searchActor
      })
     });
     const body = await response.json();
     if (response.status !== 200) throw Error(body.message);
     console.log("body: ", body)
     return body;
   }

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
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                Review
              </Typography>
            </Button>
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Recommendations')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
              Recommendations
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Grid item xs={10} md={8} style={{ position: 'relative' }} paddingLeft={55}>
          <Typography variant="h3" color="primary">
            <h3 style={{ margin: 2 }}>Search a Movie</h3>
          </Typography>
        </Grid> 

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} paddingLeft={10}>
  {/* Left side: Input fields */}
  <Grid item xs={12} md={6}>
    <Box sx={{ marginBottom: '16px' }}>
      <label>Movie Title</label>
    </Box>
    <TextField
      label="Movie Title"
      fullWidth
      value={searchTitle}
      onChange={handleSearchTitleChange}
    />

    <Box sx={{ marginBottom: '16px' }}>
      <label>Director's Name</label>
    </Box>
    <TextField
      label="Director Name"
      fullWidth
      value={searchDirector}
      onChange={handleSearchDirectorChange}
    />

    <Box sx={{ marginBottom: '16px' }}>
      <label>Actor's Name</label>
    </Box>
    <TextField
      label="Actor Name"
      fullWidth
      value={searchActor}
      onChange={handleSearchActorChange}
    />

    <Button
      variant="contained"
      style={{ marginLeft: 'auto', display: 'block', marginTop: '20px' }} 
      onClick={handleButtonClick}
    >
      Search
    </Button>
  </Grid>

  {/* Right side: Results */}
  <Grid item xs={12} md={6} paddingRight={10}>
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



      {/* {results.map((movie) => (
       <list key={movie.id} value={movie.id}>{results.name}</list>
      ))} */}
    </ThemeProvider>
  </div>
  );
};

export default Search;


