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

const ProductSection = ({ data, categories, setFilter, filter, dispatch }) => {

    const [page, setPage] = useState(1);
    const handlePagination = (event, value) => {
        setPage(value)
    };
    const [selectedCategory, setSelectedCategory] = useState(filter.category);
    const handleAutocompleteChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setFilter({...filter, category: newValue?._id });
    };

    function handleAdd(item) {
        dispatch(addCartItem({item: {_id: item._id, name: item.name, qtn: 1, price: item.selling_price, original_price: item.selling_price, discount: item.discount, tax: item.tax}}))
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
                    options={categories}
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
                    onChange={(e) => setFilter({...filter, text: e.target.value})}
                />
            </Grid>
        </Grid>

        <br/>

        {/* Products List */}
        <Grid container spacing={2} sx={{ margin: '0px 15px'}}>
            { data.map((item, index) => (
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
                            <Typography variant="body2" sx={{ display:'flex' ,justifyContent: 'center',}}><b>{(item.selling_price - item.discount ).toFixed(2) }₹</b> 
                            <span style={{ marginLeft: '5px'}}><strike>{item.selling_price}₹</strike></span></Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleAdd(item)} variant="outlined" size="small" color="success">Add</Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
        </Grid>
        
        <br/>

        {/* Pagination */}
        <Stack spacing={2} sx={{ alignItems: 'end'}}>
            <Pagination 
                count={Math.ceil(data.length / ITEMS_PER_PAGE)} 
                siblingCount={0} 
                boundaryCount={1} 
                page={page} 
                onChange={handlePagination} 
                shape="rounded" color="primary" 
            />
        </Stack>

    </MainCard>
  )
}

export default ProductSection