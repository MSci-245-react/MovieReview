// import * as React from 'react';
import React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import { Grid, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const Review = () => {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: purple,
      secondary: purple,
    },
  });

  let serverURL = "";

  const initialMovies = [
    "Pride & Prejudice",
    "Inception",
    "The Proposal",
    "The Green Book",
    "Frozen"
  ];

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
      userId: userId, // Replace with the appropriate user ID
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
    
    return body;
  }

  const getMovies = () => {
    callApigetMovies()
    .then(res => {
      setMovies(res);
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
    <>
      <ThemeProvider theme={lightTheme}>
        <Grid item xs={10} md={8} style={{ position: 'relative' }} paddingLeft={55}>
          <Typography variant="h3" color="primary">
            <h3 style={{ margin: 2 }}>Review a Movie</h3>
          </Typography>
        </Grid> 
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} paddingLeft={40}>
          <MovieSelection movies={movies} selectedMovie={selectedMovie} handleMovieChange={handleMovieChange} isButtonClicked={isButtonClicked}  />
          <Grid item xs={10} md={8}>
            {!completed && isButtonClicked && selectedMovie === '' && (
              <Typography variant="body2" color="error">
                Select your movie
              </Typography>
            )}
          </Grid>
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} isButtonClicked={isButtonClicked} />
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
          </Grid>
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} isButtonClicked={isButtonClicked} />
          <Grid item xs={10} md={8}>
            {!completed && isButtonClicked && selectedRating === '' && (
              <Typography variant="body2" color="error">
                Select the rating
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={8} md={6}>
          <Button variant="contained" style={{ marginLeft: '68%' }} onClick={handleButtonClick}>
            Submit
          </Button>
          {completed && (
            <Typography variant="body2" color="success.main" style={{ marginLeft: '68%' }}>
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
      </ThemeProvider>
    </>
  );
};

export default Review;