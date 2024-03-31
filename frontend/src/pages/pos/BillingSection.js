import MainCard from 'components/MainCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Autocomplete, TextField, Typography} from '@mui/material';
import CartTable from './CartTable';
import CustomButton from 'components/CustomButton/index';
import WarningModal from 'components/CustomModal/Warning';
import PaymentModal from 'components/CustomModal/PaymentModal';
import InvoiceModal from 'components/CustomModal/InvoiceModal';
import CustomerModal from './CustomerModal';
import { useSelector } from 'react-redux';
import { fetchAllCustomer, selectAllEmployeeList } from 'store/reducers/employees';
import BillingDetails from './BillingDetails';

const BillingSection = ({ customer, dispatch }) => {
  console.log({ customer });
  const { items } = useSelector((state) =>  state.cart)
  console.log({ items });

  const [cancelModal, setCancelModal] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false)
  const [invoiceModal, setInvoiceModal] = React.useState(false)
  const [customerModal, setCustomerModal] = React.useState(false)
  const [productBill, setProductBill] = React.useState(
    { sub_total: 0, tax: 0, discount: 0, extra_discount: 0, coupon_discount: 0, total: 0 }
  )
  const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleAutocompleteChange = (event, newValue) => {
      setSelectedCustomer(newValue);
    };

    const deatails = [
      {title: 'Sub total:', value: 0.00},
      {title: 'Product discount:', value: 0.00},
      {title: 'Extra discount:', value: 0.00},
      {title: 'Coupon discount:', value: 0.00},
      {title: 'Tax:', value: 0.00},
      {title: 'Total:', value: 0.00},
    ]
    useEffect(() => {
      const { sub_total, discount, tax } = items.reduce((acc, item) => {
        acc.sub_total += item.price * item.qtn;
        acc.discount += item.discount * item.qtn;
        acc.tax += item.tax * item.qtn;
        return acc;
      }, { sub_total: 0, discount: 0, tax: 0 });
    
      setProductBill(prevState => ({
        ...prevState,
        sub_total,
        discount,
        tax
      }));
    }, [items])

  return (
    <React.Fragment>
      <CustomerModal open={customerModal} handleClose={() => setCustomerModal(false)} dispatch={dispatch}/>
      <MainCard title="Billing Section" headerColor='#f9fafc' >
        {/* Row 1 */}
        <Grid container spacing={2}>
            <Grid item xs={8} sm={8} md={8} lg={8}>
                <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={customer}
                    getOptionLabel={(option) => option?.name}
                    getOptionSelected={(option, value) => option?._id === value?._id}
                    value={selectedCustomer}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => <TextField {...params} className='search-autocomplete' label="--select customer--" />}
                />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Customer" icon={true} handleClick={() => setCustomerModal(true)}/>
            </Grid>
        </Grid>

        <br/>
        {/* Row 2 */}
        { selectedCustomer &&
          <Typography variant="body5" onClick={() => console.log({ productBill})}>Current Customer : {selectedCustomer.name}</Typography>
        }

        <br/> 
        {/* Row 4 Table */}
        {/* [
          {item: 'Marvel School bag', qty: 1, price: 4500},
        ] */}
        <CartTable data={items} dispatch={dispatch}/>

        <br/>
        {/* Row 5 */}
        <BillingDetails productBill={productBill}/>

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
          handleSubmit={() => {
            setPaymentModal(false)
            setInvoiceModal(true)
          }}
        />
      }
      {
        invoiceModal &&
        <InvoiceModal open={invoiceModal} handleClose={() => setInvoiceModal(false)}/>
      }
    </React.Fragment>
  )
}

export default BillingSection