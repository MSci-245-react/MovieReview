import React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import { Grid, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: purple,
      secondary: purple,
    },
  });

  let serverURL = "";
  
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [submittedSelectedMovie, setSubmittedSelectedMovie] = React.useState('');
  const [submittedEnteredTitle, setSubmittedEnteredTitle] = React.useState('');
  const [submittedEnteredReview, setSubmittedEnteredReview] = React.useState('');
  const [submittedSelectedRating, setSubmittedSelectedRating] = React.useState('');
  const [userId, setUserId] = React.useState(1);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const isValueEmpty = !selectedMovie || !enteredTitle || !selectedRating || !enteredReview;

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setSubmittedSelectedMovie(selectedMovie);
    setSubmittedEnteredTitle(enteredTitle);
    setSubmittedSelectedRating(selectedRating);
    setSubmittedEnteredReview(enteredReview);

    if (!isValueEmpty) {
      setCompleted(true);
      setSelectedMovie('');
      setEnteredTitle('');
      setSelectedRating('');
      setEnteredReview('');
    } else {
      setCompleted(false);
    }

    callApiSendReview()
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  const getSelectedMovieId = () => {
    const selectedMovieObject = movies.find(movie => movie.name === selectedMovie);
     
    if (selectedMovieObject) {
      const selectedMovieId = selectedMovieObject.id;
      
      return selectedMovieId;
    }

    return null;
  }

  const callApiSendReview = async () => {
    const url = serverURL + "/api/addReview";

    const data = {
      movieId: getSelectedMovieId(),
      userId: userId,
      reviewTitle: enteredTitle,
      reviewContent: enteredReview,
      reviewScore: selectedRating
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
  }

  const getMovies = () => {
    callApigetMovies()
      .then(res => {
        let parsed = JSON.parse(res.express)
        setMovies(parsed);
      })
  }

  const callApigetMovies = async () => {
    const url = serverURL + "/api/getMovies";

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

  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/Review')}>
                <Typography variant="h5" noWrap style={{ color: '#fff' }}>
                  Review
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
              <Button sx={{ textTransform: 'none', marginLeft: '16px' }} onClick={() => navigate('/Recommendations')}>
                <Typography variant="h6" noWrap style={{ color: '#fff' }}>
                  Recommendations
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid item sx={{ mt: 4, px: 4 }} style={{ position: 'relative' }} paddingLeft={5}>
        <Typography variant="h3" color="primary">
          Review a Movie
        </Typography>
      </Grid>
      <Grid container spacing={2} paddingLeft={4} maxWidth="xl" sx={{ mt: 4, px: 4 }}>
        <Grid item xs={6} alignItems="center" justifyContent="center">
          <MovieSelection movies={movies} selectedMovie={selectedMovie} handleMovieChange={handleMovieChange} isButtonClicked={isButtonClicked}  />
          <Grid item xs={10} md={8} sm={8}>
            {!completed && isButtonClicked && selectedMovie === '' && (
              <Typography variant="body2" color="error">
                Select your movie
              </Typography>
            )}
            <br></br>
          </Grid>
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} isButtonClicked={isButtonClicked} />
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={10} md={8}>
            {!completed && isButtonClicked && enteredTitle === '' && (
              <Typography variant="body2" color="error">
                Enter your review title
              </Typography>
            )}
          </Grid>
          <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} isButtonClicked={isButtonClicked} />
          <Grid item xs={10} md={8}>
            {!completed && isButtonClicked && enteredReview === '' && (
              <Typography variant="body2" color="error">
                Enter your review
              </Typography>
            )}
            <br></br>
          </Grid>
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} isButtonClicked={isButtonClicked} />
          <Grid item xs={10} md={8}>
            {!completed && isButtonClicked && selectedRating === '' && (
              <Typography variant="body2" color="error">
                Select the rating
              </Typography>
            )}
            <br></br>
          </Grid>

          <Grid item xs={10} md={8}>
            <Button variant="contained" style={{ marginLeft: '80%' }} onClick={handleButtonClick}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={10}>
            {completed && (
              <Typography variant="body2" color="success.main" style={{ marginLeft: '50%' }}>
                <b>Your review has been submitted.</b>
                <br />
                Movie: {submittedSelectedMovie}
                <br />
                Title: {submittedEnteredTitle}
                <br />
                Body: {submittedEnteredReview}
                <br />
                Rating: {submittedSelectedRating}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Review;