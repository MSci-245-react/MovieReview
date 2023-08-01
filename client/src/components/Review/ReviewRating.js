import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, FormControl, RadioGroup, FormControlLabel, Radio} from '@mui/material';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <Grid item xs={12} md={8}>
        <label>Rate the Movie</label>
      </Grid>
      <br></br>
      <Grid item xs={12} md={8}>
        <FormControl>
          <RadioGroup name="radio buttons group" onClick={props.handleRatingChange} value={props.selectedRating}>
            <FormControlLabel value={1} control={<Radio />} label="1" />
            <FormControlLabel value={2} control={<Radio />} label="2" />
            <FormControlLabel value={3} control={<Radio />} label="3" />
            <FormControlLabel value={4} control={<Radio />} label="4" />
            <FormControlLabel value={5} control={<Radio />} label="5" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}

export default ReviewRating;