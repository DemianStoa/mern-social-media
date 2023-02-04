import { useState } from 'react'
import { 
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../../state"
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery("(min-width: 1024px)")


  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt
  
 const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween>
        {isNonMobileScreens ? (<>
        <Typography
         fontWeight='bold'
         fontSize="clamp(1.5rem, 2rem, 2.25rem)"
         color="primary"
         onClick={() => navigate("/home")}
         sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer"
          }
         }}
        >
        Social Media
        </Typography></>) : (
        <Typography
         fontWeight='bold'
         fontSize="clamp(1rem, 1.5rem, 2.25rem)"
         color="primary"
         onClick={() => navigate("/home")}
         sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer"
          }
         }}
        >
        Social Media
        </Typography>
        )}
      <FlexBetween 
        backgroundColor={neutralLight} 
        borderRadius="9px" 
        width="clamp(15rem,50%,50rem)"
        gap="3rem" 
        padding="0.1rem">
          <InputBase 
          sx={{padding: "0 .5rem"}} 
          placeholder="Search..." 
          fontSize="1.2rem"
          />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
        </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
      <FlexBetween  gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px"}} />
          ):(
            <LightMode sx={{ color: dark, fontSize: "25px"}} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant='standard' value={fullName} >
          <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: '150px',
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root" : {
              pr: "0.25rem",
              width: "3rem"
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight
            }
          }}
          input={<InputBase/>}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>):(
      <IconButton
       onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        <Menu />
      </IconButton>
      )}
      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem" >
              <IconButton
               onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
               >
                <Close />
               </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween 
            display="flex" 
            flexDirection='column' 
            alignItems='center' 
            gap="3rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px"}} />
          ):(
            <LightMode sx={{ color: dark, fontSize: "25px"}} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant='standard' value={fullName} >
          <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: '150px',
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem"
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight
            }
          }}
          input={<InputBase/>}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar