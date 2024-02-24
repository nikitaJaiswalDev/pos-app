import React from 'react'
import {Dialog, DialogTitle, IconButton, DialogContent, Typography, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Box, Divider} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/CustomButton/index';
import ReactToPrint from "react-to-print";

const boxSx = {
  display: 'flex',
  justifyContent: 'space-between'
}
const dialogContentSx= {
  padding: '50px 80px',
  textAlign: 'center'
}
const buttonContainerSx={
  display: 'flex', justifyContent: 'center', padding: '10px 0px', gap: '25px'
}
const CustomTable = () => {
  return (
    <Paper sx={{boxShadow: 'unset'}}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>SL</TableCell>
                <TableCell align="right">DESC</TableCell>
                <TableCell align="right">QTY</TableCell>
                <TableCell align="right">PRICE</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">1</TableCell>
                <TableCell align="right">Sky Blue Shirt</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">1305 $</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  )
}
const InvoiceModal = ({ open, handleClose }) => {
  // const componentRef = React.useRef(null);

  // const reactToPrintContent = React.useCallback(() => {
  //   return componentRef.current;
  // }, [componentRef.current]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title"> Print Invoice </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
        <Box sx={buttonContainerSx}>
          <CustomButton bgColor="#161853" hoverColor="#111452" title="Proceed, If thermal printer is ready."/>
          <CustomButton bgColor="#ed4c78" hoverColor="#e91e56" title="Back"/>
        </Box>

        <DialogContent dividers sx={dialogContentSx}>
          <Typography variant="h4" gutterBottom>6POS SUPER SHOP</Typography>
          <Typography variant="body2" gutterBottom>House: 00, Road: 00, City: Demo, United State</Typography>
          <Typography variant="body2" gutterBottom>Phone : +000123456789</Typography>
          <Typography variant="body2" gutterBottom>Email : demo@6amtech.com</Typography>
          <Typography variant="body2" gutterBottom>Vat registration number : DHUJ77788VV</Typography>
          
          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>

          <Typography variant="subtitle1" gutterBottom>Order ID : 100033</Typography>
          <Typography variant="subtitle2" gutterBottom>29/Jan/2024 09:05 pm</Typography>
          
          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>

          <CustomTable />

          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>
                    
          <br/>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Items price:</Typography>
            <Typography variant="subtitle2" gutterBottom>1305 $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Tax / VAT:</Typography>
            <Typography variant="subtitle2" gutterBottom>0 $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Subtotal:</Typography>
            <Typography variant="subtitle2" gutterBottom>1305 $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Extra discount:</Typography>
            <Typography variant="subtitle2" gutterBottom>0 $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Coupon discount:</Typography>
            <Typography variant="subtitle2" gutterBottom>0 $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle1" gutterBottom>Total:</Typography>
            <Typography variant="subtitle1" gutterBottom>1305 $</Typography>
          </Box>

          <Divider />

          <br/>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Paid by: Cash</Typography>
            <Typography variant="subtitle2" gutterBottom>Amount: 1190 $</Typography>
            <Typography variant="subtitle2" gutterBottom>Change: 0 $</Typography>
          </Box>


          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>
          <Typography variant="h5" gutterBottom>THANK YOU</Typography>
          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>
        
        </DialogContent>
      </Dialog>

      <ReactToPrint
        // content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        // onAfterPrint={handleAfterPrint}
        // onBeforeGetContent={handleOnBeforeGetContent}
        // onBeforePrint={handleBeforePrint}
        // removeAfterPrint
        // trigger={reactToPrintTrigger}
      />

    </React.Fragment>
  )
}

export default InvoiceModal