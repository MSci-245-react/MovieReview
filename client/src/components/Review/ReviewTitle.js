import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, TextField } from '@mui/material';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <Grid item xs={10} md={8}>
        <label>Title your Review</label>
      </Grid>
      <br></br>
      <Grid item xs={10} md={8}>
        <TextField
          label="Review Title"
          fullWidth
          value={props.enteredTitle}
          onChange={props.handleTitleChange}
        />
      </Grid>

    </>
  );
}

export default ReviewTitle;
