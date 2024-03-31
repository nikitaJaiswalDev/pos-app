import React from 'react';
import { Grid, Typography} from '@mui/material';

const BillingDetails = ({ productBill }) => {
  return (
    <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Sub total:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{productBill.sub_total} ₹</Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Product Discount:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{productBill.discount} ₹</Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Extra Discount:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{productBill.extra_discount} ₹</Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Coupon Discount:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{productBill.coupon_discount} ₹</Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Tax:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{productBill.tax} ₹</Typography>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body5">Total:</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
            <Typography variant="body5" >{(productBill.sub_total - productBill.discount) + productBill.tax} ₹</Typography>
          </Grid>
        </Grid>
    </React.Fragment>
  )
}

export default BillingDetails