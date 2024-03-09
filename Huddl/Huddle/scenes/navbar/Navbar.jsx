import { useState } from "react";
import{
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FromControl,
  useTheme,
useMediaQuery
} from "@mui/material";
import {
 Search,
 Message,
 Darkmode,
 LightMode,
 Notifications,
 Help,
 Menu,
 Close
} from '@mui/icons-material';
import { useDispatch,useSelector } from "react-redux";
import {setMode,setLogout} from "state";
import { useNavigate } from "react-router-dom";
import Flexbetween from "../../src/flexbetween";
const Navbar = () => {
  const [ isMobileMenuToggled,setMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const isNonMobileScreens  = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.background.alt;
  const fullname =`${user.firstName} ${user.lastName}`;
  
  return <Flexbetween padding="1rem 6%" backgroundColor={alt}>
    <Flexbetween gap="1.75rem">
      <Typography
      fontWeight="bold"
      fontSize="clamp(1rem,2rem,2.25rem)"
      color="primary"
      onClick={()=>navigate('/home')}
      sx={{
        "&:hover":{
          color:primaryLight,
          cursor:"pointer"
        },

      }}>Huddle</Typography>
      {isNonMobileScreens && (
        <Flexbetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="1rem 1.4rem">
          <InputBase placeholder="search..."/>
          <IconButton>
            <Search/>
          </IconButton>
          </Flexbetween>
          )}
    </Flexbetween>
    {isNonMobileScreens?(
      <Flexbetween gap="2rem">
        <IconButton onClick={()=>dispatch(setMode())}>
          {theme.palette.mode==="dark"?(
            <Darkmode sx={{fontSize:"25px"}}/>
          ):(
            <LightMode sx= {{color:dark,fontsize:"25px"}}/>
          )}
        </IconButton>
      </Flexbetween>
    ):()}
  </Flexbetween>

}
export default Navbar

