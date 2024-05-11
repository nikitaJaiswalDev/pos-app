import MainCard from 'components/MainCard'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchShop, selectAllEmployeeList } from 'store/reducers/employees';
import MaterialTable from 'components/CustomTable/MaterialTable';
import { useMaterialReactTable } from 'material-react-table';
import moment from 'moment'
import { capitalizedString } from 'utils/index';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import InvoiceModal from 'pages/pos/modals/InvoiceModal';

const Order = () => {
    const dispatch = useDispatch();
    const { employeeSlice } = useSelector(selectAllEmployeeList);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [openInvoice, setOpenInvoice] = useState(false)
    const [invoiceData, setInvoiceData] = useState([])

    useEffect(() => {
        dispatch(fetchAllOrders({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
    }, [dispatch, pagination]);

    useEffect(() => {
        dispatch(fetchShop());
    }, [dispatch]);
    
    const handleInvoice = async(data) => {
        setOpenInvoice(true)
        setInvoiceData({
            billing: {
                payment_method: data.payment_method ,
                total_tax: data.total_tax,
                order_amount: data.order_amount,
                extra_discount: data.extra_discount,
                coupon_discount: data.coupon_discount,
                paid_amount: data.paid_amount,
                customer: data.customer,
                _id : data._id,
                createdAt:  data.createdAt,
                updatedAt: data.updatedAt,
                order: data.order    ,
                __v: 0
            },
            products: data.product
        })
    }

    const columns = React.useMemo(
        () => [
            {
                id: 'index',
                header: '#',
                size: 50,
                Cell: ({ row }) => (
                        <p>{  row.index + 1 }</p>
                )
            },
            {
                accessorKey: 'order',
                header: 'Order Id',
                size: 100,
            },
            {
                id: 'date',
                header: 'Date',
                size: 100,
                Cell: ({ row }) => (
                        <p>{ moment( row.original.createdAt).format('MMMM Do, YYYY') }</p>
                )
            },
            {
                id: 'payment_method',
                header: 'Payment Method',
                size: 100,
                Cell: ({ row }) => (
                        <p>{ capitalizedString(row.original.payment_method) }</p>
                )
            },
            {
                id: 'order_amount',
                header: 'Order Amount',
                size: 100,
                Cell: ({ row }) => (
                    <p>{ row.original.order_amount } { employeeSlice.shop[0]?.currency }</p>
                )
            },
            {
                id: 'total_tax',
                header: 'Total Tax',
                size: 100,
                Cell: ({ row }) => (
                    <p>{ row.original.total_tax } { employeeSlice.shop[0]?.currency }</p>
                )
            },
            {
                id: 'extra_discount',
                header: 'Extra Discount',
                size: 100,
                Cell: ({ row }) => (
                    <p>{ row.original.extra_discount } { employeeSlice.shop[0]?.currency }</p>
                )
            },
            {
                id: 'coupon_discount',
                header: 'Coupon Discount',
                size: 100,
                Cell: ({ row }) => (
                    <p>{ row.original.coupon_discount } { employeeSlice.shop[0]?.currency }</p>
                )
            },
            {
                id: 'paid_amount',
                header: 'Paid Amount',
                size: 100,
                Cell: ({ row }) => (
                    <p>{ row.original.paid_amount } { employeeSlice.shop[0]?.currency }</p>
                )
            },
        ],
        [],
    )

    const table = useMaterialReactTable({
        columns,
        data: employeeSlice.orders?.data?.orders || [],
        enableRowActions: true,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableSorting: false,
        enableColumnActions: false,
        enableStickyHeader: true,
        enableHiding: false,
        positionGlobalFilter: 'left',
        enableFilterMatchHighlighting: true,
        positionActionsColumn: 'last',
        enableGlobalFilter: true,
        enableFilters: true,
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        manualPagination: true,
        rowCount: employeeSlice?.orders?.data?.pagination?.total,
        onPaginationChange: setPagination,
        state: {
            pagination,
            isLoading: employeeSlice?.isOrderPending
        },
        renderRowActions: (row) => (
            <Button variant="outlined" startIcon={<ArrowCircleDownIcon />} onClick={() => handleInvoice(row?.row?.original)}>Invoice</Button>
        ),
        
    })
  return (
    <MainCard title="order Card">
        <MaterialTable table={table} title={'Order Table'}/>

        {
            openInvoice &&
            <InvoiceModal open={openInvoice} handleClose={() => setOpenInvoice(false)} invoiceData={invoiceData} currency={employeeSlice.shop[0]?.currency }/>
        }
    </MainCard>
  )
}

export default Order