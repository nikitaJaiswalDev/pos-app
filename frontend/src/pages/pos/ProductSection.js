import MainCard from 'components/MainCard'
import React, { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Grid, Stack, Pagination, TextField, Autocomplete} from '@mui/material';
import { PRODUCTS_ITEMS } from 'utils/productsList';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 }
]
// header style
const contentSX = {
    display: 'grid',
    justifyContent: 'center'
};
const ITEMS_PER_PAGE = 10;

const ProductSection = () => {

    const [page, setPage] = useState(1);
    const handlePagination = (event, value) => {
        setPage(value)
        console.log({ event, value });
    };
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedProducts = PRODUCTS_ITEMS.slice(startIndex, endIndex);
    console.log({ displayedProducts });

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
                    options={top100Films}
                    renderInput={(params) => <TextField {...params} className='search-autocomplete' placeholder="All categories" />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField size="small" fullWidth id="outlined-basic" variant="outlined" placeholder="Search by code or name"/>
            </Grid>
        </Grid>

        <br/>

        {/* Products List */}
        <Grid container spacing={2} sx={{ margin: '0px 15px'}}>
            { displayedProducts.map((item, index) => (
                <Grid item xs={4} sm={3} md={3} lg={2.2} key={index}>
                    <Card sx={{ maxWidth: 180 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={item.image}
                            alt="product"
                            sx={{objectFit: 'contain'}}
                        />
                        <CardContent sx={contentSX}>
                            <Typography variant="h5">{item.title.length > 10 ? item.title.slice(0,10)+'...' : item.title}</Typography>
                            <Typography variant="body2" sx={{ display:'flex' ,justifyContent: 'center'}}>{item.discount_price} $ <strike>{item.original_price} $</strike></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
        </Grid>
        
        <br/>

        {/* Pagination */}
        <Stack spacing={2} sx={{ alignItems: 'end'}}>
            <Pagination 
                count={Math.ceil(PRODUCTS_ITEMS.length / ITEMS_PER_PAGE)} 
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