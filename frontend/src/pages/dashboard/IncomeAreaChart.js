import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import Chart from "react-apexcharts";
import { fetchChartStats, selectAllEmployeeList } from 'store/reducers/employees';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| INCOME AREA CHART ||============================== //

const getWeeksInMonths = (orders = []) => {
  const weeks = [];
  const months = [];
  const counts = [];
  
  orders.forEach(order => {
    const { month, week } = order._id;
    const { count } = order;
    weeks.push(`Week ${week}`);
    months.push(`Month ${month}`);
    counts.push(count);
  });

  return { months, weeks, counts };
};

const IncomeAreaChart = ({ slot }) => {
  
  const dispatch = useDispatch();
  
  // Fetching employee data using Redux
  const { employeeSlice } = useSelector(selectAllEmployeeList);
  const {months, weeks, counts } = getWeeksInMonths(employeeSlice.chartStats?.data?.orders);

  useEffect(() => {
    // Dispatching action to fetch chart data based on the selected type
    dispatch(fetchChartStats({ type: slot }));
  }, [dispatch, slot]);

  // Dynamically update chart options when data changes
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar: { show: false },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: { width: '100%' },
            xaxis: {
              labels: { show: true }
            }
          }
        }
      ]
    },
    xaxis: {
      categories: [] // Initially empty, will be set dynamically
    }
  });

  const [series, setSeries] = useState([
    {
      name: "Orders Count",
      data: [] // Initially empty, will be set dynamically
    }
  ]);

  // Update options and series when weeks or counts change
  useEffect(() => {
    if (weeks.length && counts.length) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: slot === 'week' ? weeks : months }
      }));

      setSeries([
        {
          name: "Orders Count",
          data: counts
        }
      ]);
    }
  }, [employeeSlice.isChartStatsPending, slot]); // Only update when weeks or counts change

  return (
    employeeSlice.isChartStatsPending ? <div>Loading...</div> : 
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="350"
    />
  );
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;
