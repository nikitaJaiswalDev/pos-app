import MainCard from 'components/MainCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Autocomplete, TextField, Typography} from '@mui/material';
import CartTable from './CartTable';
import CustomButton from 'components/CustomButton/index';
import WarningModal from 'components/CustomModal/Warning';
import PaymentModal from './modals/PaymentModal';
import InvoiceModal from './modals/InvoiceModal';
import CustomerModal from './modals/CustomerModal';
import { useSelector } from 'react-redux';
import BillingDetails from './BillingDetails';
import { openWarning } from 'store/reducers/warning';
import { addCartItem } from 'store/reducers/cartItems';

const BillingSection = ({ customer, dispatch, currency }) => {
  const { items } = useSelector((state) =>  state.cart)

  const [cancelModal, setCancelModal] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false)
  const [invoiceModal, setInvoiceModal] = React.useState(false)
  const [customerModal, setCustomerModal] = React.useState(false)
  const [invoiceData, setInvoiceData] = useState(null)
  const [productBill, setProductBill] = React.useState(
    { sub_total: 0, tax: 0, discount: 0, extra_discount: 0, coupon_discount: 0, total: 0 }
  )
  const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleAutocompleteChange = (event, newValue) => {
      setSelectedCustomer(newValue);
    };

    useEffect(() => {
      console.log({ items });
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
        tax,
        total: ((sub_total - discount ) + tax).toFixed(2),
      }));
    }, [items])

    const handleClear = () => {
      dispatch(openWarning({ warning_open: true, content: "You want to remove all items from cart!!", id: 1, delete_type: 'clear_cart' }))
    }

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
          <Typography variant="body5" >Current Customer : {selectedCustomer.name}</Typography>
        }

        <br/> 
        {/* Row 4 Table */}
        {/* [
          {item: 'Marvel School bag', qty: 1, price: 4500},
        ] */}
        <CartTable data={items} dispatch={dispatch} currency={currency}/>

        <br/>
        {/* Row 5 */}
        <BillingDetails productBill={productBill} currency={currency}/>

        <br/>
        {/* Row 6*/}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CustomButton bgColor="#f2678d" hoverColor="#ed4c78" title="Cancel Order" width={'200px'} 
            // handleClick={() => handleClear()}
            handleClick={() => setCancelModal(true)}
            disabled={items.length == 0 || selectedCustomer == null ? true : false} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Place Order" width={'200px'} handleClick={() => setPaymentModal(true)} disabled={items.length == 0 || selectedCustomer == null ? true : false} />
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
          handleYes={() => {
            dispatch(addCartItem({item: null}))
            setCancelModal(false)
          }}
        />
      }
      {
        paymentModal &&
        <PaymentModal 
          open={paymentModal} 
          handleClose={() => setPaymentModal(false)}
          setPaymentModal={setPaymentModal}
          setInvoiceModal={setInvoiceModal}
          productBill={productBill}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          dispatch={dispatch}
          setProductBill={setProductBill}
          setInvoiceData={setInvoiceData}
          items={items}
          currency={currency}
        />
      }
      {
        invoiceModal &&
        <InvoiceModal open={invoiceModal} handleClose={() => setInvoiceModal(false)} invoiceData={invoiceData} currency={currency}/>
      }
    </React.Fragment>
  )
}

export default BillingSection