import React, { useEffect } from 'react'
import {Dialog, DialogTitle, IconButton, DialogContent, Typography, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Box, Divider} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/CustomButton/index';
import ReactToPrint from "react-to-print";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, selectAllEmployeeList } from 'store/reducers/employees';

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
const CustomTable = ({ data }) => {

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
              { data.map((item, index) => (
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell align="right">{item?.name.length > 20 ? item.name.slice(0,20)+'...' : item?.name}</TableCell>
                  <TableCell align="right">{item?.qtn}</TableCell>
                  <TableCell align="right">{item?.price} $</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  )
}
const InvoiceModal = ({ open, handleClose, invoiceData }) => {

  const { employeeSlice } = useSelector(selectAllEmployeeList);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShop());
  }, [dispatch]);
  
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
          <CustomButton handleClick={handleClose} bgColor="#ed4c78" hoverColor="#e91e56" title="Back"/>
        </Box>

        <DialogContent dividers sx={dialogContentSx}>
          <Typography variant="h4" gutterBottom>6POS SUPER SHOP</Typography>
          <Typography variant="body2" gutterBottom>
            House: {employeeSlice?.shop[0]?.address}, {employeeSlice?.shop[0]?.country}</Typography>
          <Typography variant="body2" gutterBottom>Phone : {employeeSlice?.shop[0]?.phone}</Typography>
          <Typography variant="body2" gutterBottom>Email : {employeeSlice?.shop[0]?.email}</Typography>
          <Typography variant="body2" gutterBottom>Vat registration number : {employeeSlice?.shop[0]?.vat}</Typography>
          
          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>

          <Typography variant="subtitle1" gutterBottom>Order ID : {invoiceData?.billing?.order}</Typography>
          <Typography variant="subtitle2" gutterBottom>{moment(invoiceData?.billing?.createdAt).format('MMMM Do YYYY, h:mm A')}</Typography>
          
          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>

          <CustomTable data={invoiceData?.products || []}/>

          <Typography variant="subtitle2" gutterBottom>--------------------------------------------------------------------</Typography>
                    
          <br/>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Items price:</Typography>
            <Typography variant="subtitle2" gutterBottom>{invoiceData?.billing?.order_amount} $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Tax:</Typography>
            <Typography variant="subtitle2" gutterBottom>{invoiceData?.billing?.total_tax} $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Subtotal:</Typography>
            <Typography variant="subtitle2" gutterBottom>{invoiceData?.billing?.order_amount + invoiceData?.billing?.total_tax} $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Extra discount:</Typography>
            <Typography variant="subtitle2" gutterBottom>{invoiceData?.billing?.extra_discount} $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle2" gutterBottom>Coupon discount:</Typography>
            <Typography variant="subtitle2" gutterBottom>{invoiceData?.billing?.coupon_discount} $</Typography>
          </Box>
          <Box sx={boxSx}>
            <Typography variant="subtitle1" gutterBottom>Total:</Typography>
            <Typography variant="subtitle1" gutterBottom>{invoiceData?.billing?.paid_amount} $</Typography>
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