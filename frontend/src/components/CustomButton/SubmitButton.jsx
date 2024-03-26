import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ type, text, onClick=null }) => (
  <Button variant="contained" color="primary" type="submit" onClick={onClick}>
    {type === 'add' ?  `Add ${text}` : `Update ${text}`}
  </Button>
);

export default SubmitButton;
