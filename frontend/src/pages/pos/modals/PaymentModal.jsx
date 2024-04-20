import React, { useState } from 'react'
import {Dialog, DialogActions, DialogContent, FormControl, Slide, DialogTitle, Select, MenuItem, TextField, Typography} from '@mui/material';
import CustomButton from 'components/CustomButton/index';
import { addOrder, updateProduct } from 'api/index';
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';
import { addCartItem } from 'store/reducers/cartItems';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const PaymentModal = ({ open, handleClose, setPaymentModal, setInvoiceModal, productBill, selectedCustomer, setSelectedCustomer, dispatch, setProductBill, setInvoiceData, items}) => {

    const [orderDetails, setOrderDetails] = useState({
        payment_method: '',
        collected_cash: '',
        returned_amount: '',
    })
    const [error, setError] = useState({
      payment_method_error: false,
      collected_cash_error: false,
    })

    const handleOrder = async () => {
      if(orderDetails.payment_method == '' || orderDetails.collected_cash == '') {
        setError({...error, payment_method_error: true, collected_cash_error: true})
      } else {
        setError({...error, payment_method_error: false, collected_cash_error: false})
        try {
          // Toggle loader
          dispatch(toggleLoader({ loader: true }))
        
          // Prepare order object
          const obj = {
            payment_method: orderDetails.payment_method,
            order_amount: productBill.sub_total,
            total_tax: productBill.tax,
            extra_discount: productBill.extra_discount + productBill.discount,
            coupon_discount: productBill.coupon_discount,
            paid_amount: productBill.total,
            customer: selectedCustomer._id,
            product: items.map(item => item.code)
          }      
          // Add order
          const res = await addOrder(obj);
        
          // Update product quantities and handle response
          if (res.status === 200) {
            // Update product quantities
            await Promise.all(items.map(async item => {
              await updateProduct(item._id, {
                qtn: item.total_product_qtn - 1
              });
            }));
        
            // Reset states
            setPaymentModal(false);
            setInvoiceModal(true);
            setInvoiceData({ billing: res.data.data, products: items });
            setProductBill({ sub_total: 0, tax: 0, discount: 0, extra_discount: 0, coupon_discount: 0, total: 0 });
            dispatch(addCartItem({ item: null }));
            setSelectedCustomer(null);
        
            // Toggle loader and show success toast
            dispatch(toggleLoader({ loader: false }));
            dispatch(openToast({ open: true, title: res.data.message, type: 'success' }));
          }
        } catch (error) {
          // Handle errors
          console.error("Error processing order:", error);
          dispatch(toggleLoader({ loader: false }));
          dispatch(openToast({ open: true, title: "An error occurred while processing the order.", type: 'error' }));
        }
      }
      
    }

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
                    value={orderDetails.payment_method}
                    displayEmpty
                    onChange={(e) => {
                      setOrderDetails({...orderDetails, payment_method: e.target.value})
                      setError({...error, payment_method_error: false})
                    }}
                    error={error.payment_method_error}
                >
                    <MenuItem value={'cash'}>Cash</MenuItem>
                </Select>

                <br/>
                <Typography variant="body5">Collected Cash ($)</Typography>
                <TextField 
                  id="outlined-basic" 
                  variant="outlined" 
                  value={orderDetails.collected_cash} 
                  onChange={(e) => {
                    setOrderDetails({...orderDetails, collected_cash: e.target.value, returned_amount: e.target.value - productBill.total})
                    setError({...error, collected_cash_error: false})
                  }}
                  error={error.collected_cash_error}
                />

                <br/>
                <Typography variant="body5">Returned Amount($)</Typography>
                <TextField id="outlined-basic" variant="outlined" value={orderDetails.returned_amount ? orderDetails.returned_amount.toFixed(2) : ''} InputProps={{ readOnly: true }}/>

            </FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Submit" handleClick={handleOrder}/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PaymentModal