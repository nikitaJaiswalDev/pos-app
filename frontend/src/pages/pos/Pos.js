import React from 'react'
import { Box, Toolbar,Grid } from '@mui/material';
import BillingSection from './BillingSection';
import ProductSection from './ProductSection';

const Pos = () => {
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>

      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

          {/* Product Section */}
          <Grid item xs={12} md={7} lg={8}>
            <ProductSection />
          </Grid>

          {/* Billing Section */}
          <Grid item xs={12} md={5} lg={4}>
            <BillingSection />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Pos