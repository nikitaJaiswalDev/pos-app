import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

// Style your button or the component that will act as your file input here
const Input = styled('input')({
  display: 'none',
});

const InputFile = ({ setFieldValue=null, setUploadedImage, set_data=null, data=null, color='#d0d0d0'}) => {
  // Ref for the hidden file input
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      if(set_data) {
        set_data({ ...data, image: file})
      }
      if(setFieldValue) {
        setFieldValue("profile_picture", file);
      }
    }
  };
  return (
    <React.Fragment>
        <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            name="image"
            onChange={handleFileChange}
            ref={fileInputRef}
        />
        <label htmlFor="contained-button-file">
          <Button
            sx={{ border: `1px solid ${color}`, height: '38px', color: 'unset'}}
            variant="outlined" 
            component="span" 
            fullWidth
            startIcon={<AddIcon />}
          >
            Upload Image
          </Button>
        </label>
    </React.Fragment>
  );
}

export default InputFile