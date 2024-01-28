import MainCard from 'components/MainCard'
import React from 'react'
import { Grid, Autocomplete, TextField, Typography} from '@mui/material';
import CartTable from './CartTable';
import CustomButton from 'components/CustomButton/index';
import WarningModal from 'components/CustomModal/Warning';
import PaymentModal from 'components/CustomModal/PaymentModal';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 }
]

const deatails = [
  {title: 'Sub total:', value: 0.00},
  {title: 'Product discount:', value: 0.00},
  {title: 'Extra discount:', value: 0.00},
  {title: 'Coupon discount:', value: 0.00},
  {title: 'Tax:', value: 0.00},
  {title: 'Total:', value: 0.00},
]


const BillingSection = () => {

  const [cancelModal, setCancelModal] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false)

  return (
    <React.Fragment>
      <MainCard title="Billing Section" headerColor='#f9fafc' >
        {/* Row 1 */}
        <Grid container spacing={2}>
            <Grid item xs={8} sm={8} md={8} lg={8}>
                <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    renderInput={(params) => <TextField {...params} className='search-autocomplete' label="--select customer--" />}
                />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Customer" icon={true}/>
            </Grid>
        </Grid>

        <br/>
        {/* Row 2 */}
        <Typography variant="body5">Current Customer : Walking Customer</Typography>

        <br/><br/>          
        {/* Row 3 */}
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5} md={5} lg={5}>
              <Autocomplete
                  fullWidth
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  renderInput={(params) => <TextField {...params} className='search-autocomplete' />}
              />
          </Grid>
          <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5}>
            <CustomButton bgColor="#f2678d" hoverColor="#ed4c78" title="Clear Cart"/>
          </Grid>
          <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5}>
            <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="New Order"/>
          </Grid>
        </Grid>

        <br/> 
        {/* Row 4 Table */}
        <CartTable />

        <br/>
        {/* Row 5 */}
        <Grid container spacing={2}>
          { deatails.map((item) => (
            <>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Typography variant="body5">{item.title}</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'end'}}>
                <Typography variant="body5" >{item.value} $</Typography>
              </Grid>
            </>  
          ))}
        </Grid>

        <br/>
        {/* Row 6*/}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CustomButton bgColor="#f2678d" hoverColor="#ed4c78" title="Cancel Order" width={'200px'} handleClick={() => setCancelModal(true)} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Place Order" width={'200px'} handleClick={() => setPaymentModal(true)}/>
          </Grid>
        </Grid>
      </MainCard>
      {
        cancelModal &&
        <WarningModal 
          open={cancelModal} 
          handleClose={() => setCancelModal(false)}
          title={"Are you sure?"}
          contentText="You want to remove all items from cart!!"
        />
      }
      {
        paymentModal &&
        <PaymentModal 
          open={paymentModal} 
          handleClose={() => setPaymentModal(false)}
        />
      }
    </React.Fragment>
  )
}

export default BillingSection