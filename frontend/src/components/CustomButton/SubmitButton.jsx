import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ type, text }) => (
  <Button variant="contained" color="primary" type="submit">
    {type === 'add' ?  `Add ${text}` : `Update ${text}`}
  </Button>
);

export default SubmitButton;
