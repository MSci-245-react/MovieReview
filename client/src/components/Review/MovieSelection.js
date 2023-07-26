import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations

  const arrMovies = props.movies.map((movie) => movie.name);

  return (
    <>
      <Grid item xs={10} md={8}>
        <label>Please Select a Movie</label>
      </Grid>
      <Grid item xs={10} md={8}>
        <FormControl fullWidth>
          <InputLabel id="select-movie-label">Select a Movie</InputLabel>
          <Select
            label="Select a Movie"
            fullWidth
            value={props.selectedMovie}
            onChange={props.handleMovieChange}
          >

            {arrMovies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}

export default MovieSelection;