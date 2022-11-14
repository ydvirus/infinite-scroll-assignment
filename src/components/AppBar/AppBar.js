import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SideNavDetails from '../SideNavDetails/SideNavDetails'
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Avatar,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { cyan } from "@mui/material/colors";
import { useAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Logout"];

const theme = createTheme({
  palette: {
    primary: cyan,
  },
});

const ResponsiveAppBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    console.log(event.target.innerHTML)
    const { innerHTML } = event.target
    switch (innerHTML) {
      case "Profile":
        console.log("Inside Profile switch")
        break;
      case "Logout":
        auth.logout();
        navigate("/");
        break;
      default:
        break;
    }
   
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <StorefrontIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  //   display: { xs: 'none', md: 'flex' },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RETAIL MARKET
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems:"center" }}>
              <Typography sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: "600",
                  color: "inherit",
                  textDecoration: "none",
                }}>Welcome {auth.user?.email.split("@")[0]}</Typography>
              
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.user?.email}
                    src="https://www.svgrepo.com/show/170303/avatar.svg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  if(setting === 'Profile'){
                    return (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                      <SideNavDetails setting={setting}/>
                      </Typography>
                    </MenuItem>)
                    
                  }else{ return (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>)
                    
                  }
                }
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
    </ThemeProvider>
  );
};

export default ResponsiveAppBar;
