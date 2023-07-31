import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Grid, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Button} from '@mui/material';

const Recommendations = () => {

    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: purple,
          secondary: purple,
        },
      });
     
  let serverURL = "";
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watch, setWatch] = useState();
  const [userId, setUserId] = React.useState(1);
  const [reason, setReason] = React.useState();
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [movieId, setMovieId] = React.useState()

  const navigate = useNavigate();

  useEffect(() => {
    getTopMovies();
  },[] );

  const handleWatchChange = (event) => {
    setWatch(event.target.value)
  }

  const getTopMovies = () => {
    callApigetTopMovies()
      .then(res => {
        // console.log(res.express)
        // Assuming res is an object with a "movies" property that holds the array of movies
        let parsed = JSON.parse(res.express)
        setRecommendedMovies(parsed);
        
      })
      .catch(error => {
        console.error(error); // Log any errors that occur during the API call
      });
  };
  

  const callApigetTopMovies = async () => {
   const url = serverURL + "/api/getTopMovies";
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    console.log("body getMovies:", body)
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }

  const callApiSendFeedback = async (selectedMovie) => {

    const url = serverURL + "/api/addFeedback";
    console.log("api", movieId)
    const data = {
       movie_Id: movieId,
       user_Id: userId, 
       watch: 0,
       reason: "new5"
    }
    const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
 
     const body = await response.json();
     if (response.status !== 200) throw Error(body.message);
     
     return body;
   }


  const handleButtonClick = async (movie) => {
    
    const url = serverURL + "/api/addFeedback";
    console.log("api", movieId)
    const data = {
       movie_Id: movie.id,
       user_Id: userId, 
       watch: watch,
       reason: "hiiii"
    }
    const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
 
     const body = await response.json();
     if (response.status !== 200) throw Error(body.message);
     
     return body;

  };
  
  React.useEffect(() => {
    console.log("selectedMovie: ", selectedMovie);
  }, [selectedMovie]);
  
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
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                Review
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h3" color="primary">
          Recommended Movies
        </Typography>
      </Grid>
      {recommendedMovies && 
        recommendedMovies.map((movie) => (
          <Grid item key={movie.id}>
            <Typography variant="h5">Title: {movie.movieTitle}</Typography>
            <Typography variant="body1">Average Score: {movie.AverageReviewScore}</Typography>
            
            <Typography variant="h4" color="primary">Would you watch this?</Typography>
            <FormControl fullWidth>
          <RadioGroup name="radio buttons group" onClick={handleWatchChange}>
            <FormControlLabel value={1} control={<Radio />} label="Yes"/>
            <FormControlLabel value={0} control={<Radio />} label="No"/>
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={() => handleButtonClick(movie)}>
          Submit Feedback
        </Button>
          </Grid>
        ))
     }
    </Grid>
    </ThemeProvider>
  </div>
  );
};

export default Recommendations;


// import React, { useEffect, useState } from 'react';
// import { Grid, Typography } from '@mui/material';

// const RecommendedMovies = () => {
//   const [recommendedMovies, setRecommendedMovies] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       // Fetch movie data from the server (Replace "serverURL" with your API endpoint)
//       const response = await fetch(serverURL + '/api/movies');
//       const data = await response.json();
//       // Process the movie data to calculate the average review score for each movie
//       const moviesWithAvgScore = data.map((movie) => ({
//         ...movie,
//         averageScore: calculateAverageScore(movie.reviews),
//       }));
//       // Sort the movies based on their average review score in descending order
//       const sortedMovies = moviesWithAvgScore.sort(
//         (a, b) => b.averageScore - a.averageScore
//       );
//       setRecommendedMovies(sortedMovies);
//     } catch (error) {
//       console.error('Error fetching movie data:', error);
//     }
//   };

//   const calculateAverageScore = (reviews) => {
//     if (!reviews || reviews.length === 0) {
//       return 0;
//     }
//     const totalScores = reviews.reduce((sum, review) => sum + review.score, 0);
//     return totalScores / reviews.length;
//   };

//   return (
//     <Grid container direction="column" spacing={2} alignItems="center">
//       <Grid item>
//         <Typography variant="h3" color="primary">
//           Recommended Movies
//         </Typography>
//       </Grid>
//       {recommendedMovies.map((movie) => (
//         <Grid item key={movie.id}>
//           <Typography variant="h5">{movie.name}</Typography>
//           <Typography variant="body1">Average Score: {movie.averageScore}</Typography>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };




