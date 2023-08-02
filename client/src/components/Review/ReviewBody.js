import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import { Grid, TextField } from '@mui/material';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations

  return (
    <>
      <Grid item xs={12} md={8}>
        <label>Add your Description</label>
      </Grid>
      <br></br>
      <Grid item xs={12} md={8}>
          <TextField
            id="body of review"
            label="Body"
            multiline
            rows={4}
            fullWidth
            value={props.enteredReview}
            onChange={props.handleReviewChange}
            inputProps={{ maxLength: 200 }}
          />
      </Grid>
    </>
  );
}

export default ReviewBody;