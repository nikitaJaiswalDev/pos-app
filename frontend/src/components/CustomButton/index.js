import React from 'react'
import { Button} from '@mui/material';
import {PlusOutlined} from '@ant-design/icons';

const CustomButton = ({ bgColor, hoverColor, title,icon=false, width='auto', handleClick, ...props}) => {
    const buttonSx = {
        backgroundColor: bgColor, 
        height: '36px', 
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        '&:hover': {
          backgroundColor: hoverColor,
          borderColor: hoverColor,
          boxShadow: 'none',
        },
        padding: '10px',
        width: width
      }

      
  return (
    <Button {...props} sx={buttonSx} component="label" variant="contained" startIcon={icon && <PlusOutlined />} onClick={handleClick}> 
        {title}
    </Button>
  )
}

export default CustomButton