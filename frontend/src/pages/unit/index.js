import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react'
import { Typography, Box, Grid, Stack, InputLabel, TextField, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubmitButton from 'components/CustomButton/SubmitButton';
import UnitTable from './UnitTable';
import { addUnit, updateUnit } from 'api/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUnits, selectAllEmployeeList } from 'store/reducers/employees';
import { useMutation } from '@tanstack/react-query'
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';

const Unit = () => {
  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);

  const [type, set_type] = useState({type: 'add', id: null})
  const [unit, set_unit] = useState({
    name: '', name_error: null
  })
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchAllUnits({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
  }, [dispatch, pagination]);

  // Add Employee
  const { mutateAsync: addUnitData } = useMutation({
    mutationFn: (data) => !type.id ? addUnit(data): updateUnit(type.id,data),
  })

  const handleUnitSubmit = async () => {
    if(unit.name == '') {set_unit({...unit, name_error: 'Required'})}
    else {
      dispatch(toggleLoader({loader: true}))
      const obj = {
        name: unit.name
      }
      const res = await addUnitData(obj)
      console.log({ res });
      if(res.status == 200) {
        dispatch(fetchAllUnits({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
        set_unit({ name: '', name_error: null})
        dispatch(toggleLoader({loader: false}))
        dispatch(openToast({toast_open: true, title: res.data.message, type:"success"}))
        set_type({ type: 'add', id: null})
      }
    }
  }

  return (
    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Unit Type</Typography>
      </Box>

      <MainCard >
        <Grid item xs={12}>
            <Stack spacing={1}>
                <InputLabel>Unit</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Unit"
                    name="name"
                    value={unit.name}
                    onChange={(e) => set_unit({...unit, name: e.target.value, name_error: null})}
                    error={Boolean(unit.name_error)}
                />
                {unit?.name_error && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {unit.name_error}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        
        <br/>
        <SubmitButton type={type.type} text={"Unit"} onClick={handleUnitSubmit}/>
      </MainCard>
                
        <br/>
      <MainCard>
        <UnitTable data={employeeSlice?.allUnits || []} set_unit={set_unit} set_type={set_type} pagination={pagination} setPagination={setPagination}/>
      </MainCard>
    </React.Fragment>
  )
}

export default Unit