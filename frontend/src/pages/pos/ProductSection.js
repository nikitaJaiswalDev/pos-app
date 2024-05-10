import MainCard from 'components/MainCard'
import React, { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Grid, Stack, Pagination, TextField, Autocomplete, CardActions, Button} from '@mui/material';
import { convertImage } from 'utils/index';
import { addCartItem } from 'store/reducers/cartItems';
import { useSelector } from 'react-redux';

// header style
const contentSX = {
    display: 'grid',
    justifyContent: 'center'
};

const ITEMS_PER_PAGE = 10;

const ProductSection = ({ data, categories, setFilter, filter, dispatch, pagination, setPagination, currency, delayedDispatch }) => {
    
    const handlePagination = (page) => {
        setPagination({...pagination, pageIndex: page});
    };
    const [selectedCategory, setSelectedCategory] = useState(filter.category);
    const handleAutocompleteChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setFilter({...filter, category: newValue?._id });
    };

    function handleAdd(item) {
        dispatch(addCartItem({item: {code: item.sku, name: item.name, qtn: 1, price: item.selling_price, original_price: item.selling_price, discount: item.discount, tax: item.tax, total_product_qtn: item.qtn, _id: item._id }}))
    }

  return (
    <MainCard title="Product Section" headerColor='#f9fafc'>

        {/* Search Bar */}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={categories?.data?.categories || []}
                    getOptionLabel={(option) => option?.name}
                    getOptionSelected={(option, value) => option?._id === value?._id}
                    value={selectedCategory}
                    onChange={handleAutocompleteChange}
                    renderInput={(params) => <TextField {...params} className='search-autocomplete' placeholder="All categories" />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField 
                    size="small" 
                    fullWidth id="outlined-basic" 
                    variant="outlined" 
                    placeholder="Search by code or name"
                    value={filter.text}
                    onChange={(e) =>  delayedDispatch({ text: e.target.value })}
                />
            </Grid>
        </Grid>

        <br/>

        {/* Products List */}
        <Grid container spacing={2} sx={{ margin: '0px 15px'}}>
            { data?.products?.map((item, index) => (
                <Grid item xs={4} sm={3} md={3} lg={2.2} key={index}>
                    <Card sx={{ maxWidth: 180, position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={convertImage(item.image.data)}
                            alt="product"
                            sx={{objectFit: 'contain'}}
                        />
                        <CardContent sx={contentSX}>
                            <Typography variant="h5">{item.name.length > 10 ? item.name.slice(0,10)+'...' : item.name}</Typography>
                            <Typography variant="body2" sx={{ display:'flex' ,justifyContent: 'center',}}><b>{(item.selling_price - item.discount ).toFixed(2) }{currency}</b> 
                            <span style={{ marginLeft: '5px'}}><strike>{item.selling_price}{currency}</strike></span></Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleAdd(item)} variant="outlined" size="small" color="success" disabled={item.qtn > 0 ? false: true}>Add</Button>
                            { item.qtn == 0 && 
                                <Typography variant="body2" color="red">Out of Stock</Typography>
                            }
                        </CardActions>
                    </Card>
                </Grid>
                ))}
        </Grid>
        
        <br/>

        {/* Pagination */}
        <Stack spacing={2} sx={{ alignItems: 'end'}}>
            <Pagination
                count={Math.round(data?.pagination?.total/pagination.pageSize)}
                page={pagination.pageIndex + 1}
                onChange={(event, page) => handlePagination(page - 1)}
                shape="rounded" color="primary"
            />
        </Stack>

    </MainCard>
  )
}

export default ProductSection