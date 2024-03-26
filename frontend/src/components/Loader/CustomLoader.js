import { Circles } from 'react-loader-spinner'

const loaderSx = {
    top: '50%',
    left: '50%',
    position: 'absolute',
    zIndex: 99
}
const CustomLoader = ({ open}) => {
  return (
    <Circles
        height="50"
        width="50"
        color="#1890ff"
        ariaLabel="circles-loading"
        wrapperStyle={loaderSx}
        wrapperClass=""
        visible={open}
    />
  )
}

export default CustomLoader
