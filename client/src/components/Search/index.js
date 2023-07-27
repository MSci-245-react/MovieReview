import React, { useState } from 'react';
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
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/MyPage')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                MyPage
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
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} paddingLeft={40}>
      <Grid item xs={8} md={6}>
        <label>Search by Movie </label>
      </Grid>
      <Grid item xs={10} md={8}>
        <TextField
          label="Movie Title"
          fullWidth
          value={searchTitle}
          onChange={handleSearchTitleChange}
        />
      </Grid>
      <Grid item xs={10} md={8}>
        <TextField
          label="Director Name"
          fullWidth
          value={searchDirector}
          onChange={handleSearchDirectorChange}
        />
      </Grid>
      <Grid item xs={10} md={8}>
        <TextField
          label="Actor Name"
          fullWidth
          value={searchActor}
          onChange={handleSearchActorChange}
        />
      </Grid>
      </Grid>
      <Grid item xs={8} md={6}>
          <Button variant="contained" style={{ marginLeft: '68%' }} 
          onClick={handleButtonClick}
          >
            Search
          </Button>
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
                <p>
                  <strong>Reviews:</strong>
                  {movie.ReviewContents.split('\n').map((review, reviewIndex) => (
                    <span key={reviewIndex}>
                      {`review${reviewIndex + 1}: ${review}`}
                      <br />
                    </span>
                  ))}
                </p>
              )}
            <p>
              <strong>Average Review Score:</strong> {movie.AverageReviewScore}
            </p>
            {index !== results.length - 1 && <hr />} {/* Add a horizontal line between each result object */}
          </div>
        ))}
      </ul>
      </Grid>
      {/* {results.map((movie) => (
       <list key={movie.id} value={movie.id}>{results.name}</list>
      ))} */}
    </ThemeProvider>
  </div>
  );
};

export default Search;


