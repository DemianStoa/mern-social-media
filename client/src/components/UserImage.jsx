import { Box } from '@mui/material'

const UserImage = ({ image, size="60px" }) => {
  return (
    <Box width={size} height={size}>
        <img 
            style={{ objectFit: "cover", 
            backgroundColor: "white",
            borderRadius: "50%", margin: "0"}}
            width={size}
            height={size}
            alt="user"
            src={ `${import.meta.env.VITE_SERVER_URL_BASE}/assets/${image}`}
        />
    </Box>
  )
}

export default UserImage