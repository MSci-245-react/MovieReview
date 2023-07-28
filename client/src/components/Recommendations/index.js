import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

const Recommendations = () => {

    const lightTheme = createTheme({
        palette: {
          mode: 'light',
          primary: purple,
          secondary: purple,
        },
      });
     
  let serverURL = "";
  const [recommendedMovies, setRecommendedMovies] = useState({});

  useEffect(() => {
    getTopMovies();
  }, [recommendedMovies]);

  const getTopMovies = () => {
    callApigetTopMovies()
      .then(res => {
        // console.log(res.express)
        // Assuming res is an object with a "movies" property that holds the array of movies
        setRecommendedMovies(res.express);
        console.log("Reccomended movies: " + recommendedMovies);
        
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
    console.log(body)
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }

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
            <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
              <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                Review
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
        {recommendedMovies.map((movie, index) => (
        <div key={index}>
          <p>
            <strong>Title:</strong> {movie.movieTitle}
          </p>
          <p>
            <strong>Director:</strong> {movie.DirectorNames}
          </p>
              <p>
            <strong>Average Review Score:</strong> {movie.AverageReviewScore}
              </p>
          {index !== recommendedMovies.length - 1 && <hr />} {/* Add a horizontal line between each result object */}
        </div>
      ))}
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




