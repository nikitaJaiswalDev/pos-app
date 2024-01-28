import React from 'react'
import {Dialog, DialogActions, DialogContent, FormControl, Slide, DialogTitle, Select, MenuItem, TextField, Typography} from '@mui/material';
import CustomButton from 'components/CustomButton/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PaymentModal = ({ open, handleClose}) => {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Payment"}</DialogTitle>
        <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 420 }}>
                <Typography variant="body5">Type</Typography>
                <Select
                    // value={age}
                    displayEmpty
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <br/>
                <Typography variant="body5">Collected Cash ($)</Typography>
                <TextField id="outlined-basic" variant="outlined" />

                <br/>
                <Typography variant="body5">Returned Amount($)</Typography>
                <TextField id="outlined-basic" variant="outlined" />

            </FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Submit" handleClick={handleClose}/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PaymentModal