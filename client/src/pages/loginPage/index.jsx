import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form'


const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 1024px)")

  return (
    <Box>
      <Box width="100%" 
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
      <Typography
         fontWeight='bold'
         fontSize="32px"
         color="primary"
         >
         SOCIAL MEDIA
         </Typography>
      </Box>
      <Box
        width="clamp(300px,93%,600px)"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
          <Form />
      </Box>
    </Box>
  )
}

export default LoginPage