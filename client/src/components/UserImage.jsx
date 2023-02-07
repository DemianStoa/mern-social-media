import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

const UserImage = ({ userId, image, size="60px" }) => {
  return (
    <Box width={size} height={size}>
      <Link to={`/profile/${userId}`}>
        { image &&
        <img 
            style={{ objectFit: "cover", 
            backgroundColor: "white",
            borderRadius: "50%", margin: "0"}}
            width={size}
            height={size}
            alt="user"
            src={ `${import.meta.env.VITE_SERVER_URL_BASE}/assets/${image}`}
        /> }
      </Link>
    </Box>
  )
}

export default UserImage