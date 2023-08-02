import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Grid, Paper, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Button } from '@mui/material';


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
  const [watch, setWatch] = useState([]);
  const [userId, setUserId] = React.useState(1);
  const [rating, setRating] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [movieId, setMovieId] = React.useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getTopMovies();
  }, []);

  const handleWatchChange = (event, movieId) => {
    const selectedValue = event.target.value;

    setWatch(prevWatch =>
      prevWatch.map(item => {
        if (item.movieId === `movie${movieId}`) {
          return { ...item, watch: selectedValue };
        }
        return item;
      })
    );
  };

  const handleRatingChange = (event, movieId) => {
    const selectedValue = event.target.value;

    setRating(prevRating =>
      prevRating.map(item => {
        if (item.movieId === `movie${movieId}`) {
          return { ...item, rating: selectedValue };
        }
        return item;
      })
    )
  }

  const getTopMovies = () => {
    callApigetTopMovies()
      .then(res => {
        let parsed = JSON.parse(res.express)
        setRecommendedMovies(parsed);

        const movieIds = parsed.map(movie => movie.id);
        const initialWatchState = movieIds.map(movieId => ({
          movieId: `movie${movieId}`,
          watch: null,
        }));
        setWatch(initialWatchState);

        const initialRatingState = movieIds.map(movieId => ({
          movieId: `movie${movieId}`,
          rating: null,
        }));
        setRating(initialRatingState);
      })
      .catch(error => {
        console.error(error);
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
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiSendFeedback = async (movie, movieWatch, movieRating) => {
    const url = serverURL + "/api/addFeedback";
    const data = {
      movie_Id: movie.id,
      user_Id: userId,
      watch: movieWatch,
      rating: movieRating
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

  const handleButtonClick = (movie) => {
    const movieWatch = watch.find(item => item.movieId === `movie${movie.id}`).watch;
    const movieRating = rating.find(item => item.movieId === `movie${movie.id}`).rating;
    setSubmittedFeedback(prevFeedback => ({
      ...prevFeedback,
      [movie.id]: { watch: movieWatch, rating: movieRating }
    }));

    setShowConfirmation(true);

    callApiSendFeedback(movie, movieWatch, movieRating)
      .then(res => {
        setWatch(prevWatch =>
          prevWatch.map(item => {
            if (item.movieId === `movie${movie.id}`) {
              return { ...item, watch: null };
            }
            return item;
          })
        );

        setRating(prevRating =>
          prevRating.map(item => {
            if (item.movieId === `movie${movie.id}`) {
              return { ...item, rating: null };
            }
            return item;
          })
        );

      })
      .catch(error => {
        console.error("API call error:", error);
      });
  };

  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Recommendations')}>
                  <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                    Recommendations
                  </Typography>
                </Button>
              </Box>
              <Box>
                <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/')}>
                  <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                    Landing
                  </Typography>
                </Button>
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
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Grid item sx={{ mt: 4, px: 4 }} style={{ position: 'relative' }} paddingLeft={5}>
          <Typography variant="h3" color="primary">
            Top 5 Recommended movies
          </Typography>
        </Grid>
        <Grid container maxWidth="xl" sx={{ mt: 4, px: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {recommendedMovies &&
              recommendedMovies.map((movie, index) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <Paper elevation={3} sx={{ p: 2, background: '#f0f0f0', border: '1px solid #ccc', mb: 2 }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                      {index + 1}. {movie.movieTitle}
                    </Typography>
                    <Typography variant="h5" sx={{ fontSize: '18px', color: 'primary', mt: 1 }}>
                      Average Score: {movie.AverageReviewScore}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'primary', mt: 2 }}>
                      Rate this recommendation
                    </Typography>
                    <FormControl fullWidth>
                      {rating.length > 0 ? (
                        <RadioGroup
                          name={`radio buttons group ${movie.id}`}
                          onClick={(event) => handleRatingChange(event, movie.id)}
                          value={rating.find(item => item.movieId === `movie${movie.id}`)?.rating}
                        >
                          <FormControlLabel value={1} control={<Radio />} label="1" />
                          <FormControlLabel value={2} control={<Radio />} label="2" />
                          <FormControlLabel value={3} control={<Radio />} label="3" />
                          <FormControlLabel value={4} control={<Radio />} label="4" />
                          <FormControlLabel value={5} control={<Radio />} label="5" />
                        </RadioGroup>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </FormControl>
                    <Typography variant="h5" sx={{ color: 'primary', mt: 2 }}>
                      Would you watch this movie?
                    </Typography>
                    <FormControl fullWidth>
                      {watch.length > 0 ? (
                        <RadioGroup
                          name="radio buttons group"
                          onClick={(event) => handleWatchChange(event, movie.id)}
                          value={watch.find(item => item.movieId === `movie${movie.id}`)?.watch}
                        >
                          <FormControlLabel value={1} control={<Radio />} label="Yes" />
                          <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </FormControl>
                    <Button variant="contained" onClick={() => handleButtonClick(movie)}>
                      Submit Feedback
                    </Button>
                    {submittedFeedback[movie.id] && (
                      <Typography variant="body1" sx={{ color: 'green', mt: 2 }}>
                        Thank you for your feedback! Would Watch: {submittedFeedback[movie.id].watch == 1 ? "Yes" : "No"}, Rating: {submittedFeedback[movie.id].rating}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Recommendations;




