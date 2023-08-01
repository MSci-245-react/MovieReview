import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Grid, Paper, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Button} from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';

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
  const [watch, setWatch] = useState("");
  const [submittedWatch, setSubmittedWatch] = useState()
  const [userId, setUserId] = React.useState(1);
  const [rating, setRating] = React.useState();
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [movieId, setMovieId] = React.useState()

  const navigate = useNavigate();

  useEffect(() => {
    getTopMovies();
  },[] );

  const handleWatchChange = (event) => {
    setWatch(event.target.value)
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value)
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

  const callApiSendFeedback = async(movie) => {
    const url = serverURL + "/api/addFeedback";
    console.log("api", movie.id)
    const data = {
       movie_Id: movie.id,
       user_Id: userId, 
       watch: watch,
       rating: rating
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
    setSubmittedWatch(watch)
    
    callApiSendFeedback(movie)
    .then(res => {
      setWatch("");
      console.log("ran then" + watch)    
      } 
    )
  };
  
  React.useEffect(() => {
    console.log("selectedMovie: ", selectedMovie);
  }, [selectedMovie]);
  
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
                  Home
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
            <RadioGroup
              name={`radio buttons group ${movie.id}`}
              onClick={handleRatingChange}
            >
            <FormControlLabel value={1} control={<Radio />} label="1" />
            <FormControlLabel value={2} control={<Radio />} label="2" />
            <FormControlLabel value={3} control={<Radio />} label="3" />
            <FormControlLabel value={4} control={<Radio />} label="4" />
            <FormControlLabel value={5} control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
          <Typography variant="h5" sx={{ color: 'primary', mt: 2 }}>
                    Would you watch this movie?
                  </Typography>
            <FormControl fullWidth>
          <RadioGroup name="radio buttons group" onClick={handleWatchChange}>
            <FormControlLabel value={1} control={<Radio />} label="Yes"/>
            <FormControlLabel value={0} control={<Radio />} label="No"/>
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={() => handleButtonClick(movie)}>
                    Submit Feedback
                  </Button>
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



