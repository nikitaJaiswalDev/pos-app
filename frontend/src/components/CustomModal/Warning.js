import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme} from '@mui/material';
import CustomButton from 'components/CustomButton/index';
import { useDispatch, useSelector } from 'react-redux';
import { handleDelete } from 'store/reducers/warning';

const contentTextSx = {
  color: '#545454',
  fontSize: '1.125em',
  fontWeight: '300',
  lineHeight: 'normal',
  zIndex: 1,
  wordWrap: 'break-word',
}
const titleSx= {
  color: '#595959',
  fontSize: '1.600em',
  fontWeight: '600',
  textAlign: 'center',
}

const WarningModal = ({open, handleClose, title, contentText, handleYes=null}) => {

  const dispatch = useDispatch()
  const { delete_type, id } = useSelector((state) =>  state.warning)

  const handleYesClick = () => {
    if(delete_type !== null) {
      dispatch(handleDelete({ id: id, delete_type: delete_type }))
    } else {
      handleYes()
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={titleSx} id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={contentTextSx}>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton bgColor="#aaa" hoverColor="#878181" title="No" handleClick={handleClose}/>
          <CustomButton bgColor="#00c9a7" hoverColor="#0c917b" title="Yes" handleClick={() => handleYesClick() }/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default WarningModal