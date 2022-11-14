import * as React from 'react';
// import { forwardRef } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useAuth } from '../../utils/auth';

function SideNavDetails(props, ref) {
  const [state, setState] = React.useState({
    right: false,
  });
  // const userDetails = {};
  const validUsers = [
    {
      email: 'admin@retailmarket.com',
      password: '12344321',
      designation: 'Account Owner',
      fname: 'Admin',
      lname: '',
      phone: '3862-2173-238',
      address: '65A, Krishna Garden, Pune, 2346721',
    },
    {
      email: 'sumit@gmail.com',
      password: 'sumit@001',
      designation: 'Scrum Master',
      fname: 'Sumit',
      lname: 'Sharma',
      phone: '81273-91039',
      address: '8/45, Green Park, Indore, 452002',
    },
    {
      email: 'santosh@gmail.com',
      password: 'santosh@111',
      designation: 'Software Architect',
      fname: 'Santosh',
      lname: 'Manapragada',
      phone: '2091-58760',
      address: 'Pune, Tower 2 North 3 / N3-405',
    },
  ];
  const auth = useAuth();
  const currentLoginUser = validUsers.find((item) => {
    return item.email === auth.user.email;
  });
  console.log('Current User =', currentLoginUser);

  const toggleDrawer = (anchor, open) => (event) => {
    console.log('Toggle called,', anchor, open);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const sideNav = (anchor) => (
    <Box
      sx={{ width: 350, bgcolor: '#212121', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack
        direction="row"
        sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}
        spacing={2}
      >
        <Box>
          {/* <Avatar alt="User" src="https://pic.onlinewebfonts.com/svg/img_550782.png" />   */}
          <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: '20px', color: 'white' }}
          >{`${currentLoginUser.fname} ${currentLoginUser.lname}`}</Typography>
          <Typography sx={{ color: 'white' }}>
            {currentLoginUser.designation}
          </Typography>
        </Box>
        <Box>
          <ArrowForwardIosIcon sx={{ color: '#00bcd4' }}></ArrowForwardIosIcon>
        </Box>
      </Stack>

      <Stack
        direction="row"
        sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}
        spacing={3}
      >
        <Box sx={{ marginLeft: '5px' }}>
          <PhoneIphoneIcon sx={{ color: 'white' }}></PhoneIphoneIcon>
        </Box>
        <Box>
          <Typography sx={{ color: 'white', fontSize: '15px' }}>
            {currentLoginUser.phone}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}
        spacing={3}
      >
        <Box sx={{ marginLeft: '5px' }}>
          <EmailOutlinedIcon sx={{ color: 'white' }}></EmailOutlinedIcon>
        </Box>
        <Box>
          <Typography sx={{ color: 'white', fontSize: '15px' }}>
            {currentLoginUser.email}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }}
        spacing={3}
      >
        <Box sx={{ marginLeft: '5px' }}>
          <HomeOutlinedIcon sx={{ color: 'white' }}></HomeOutlinedIcon>
        </Box>
        <Box sx={{ maxWidth: '200px' }}>
          <Typography sx={{ color: 'white', fontSize: '15px' }}>
            {currentLoginUser.address}
          </Typography>
        </Box>
      </Stack>

      <Divider />
    </Box>
  );

  return (
    <React.Fragment>
      <span onClick={toggleDrawer('right', true)}>{props.setting}</span>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {sideNav('right')}
      </Drawer>
    </React.Fragment>
  );
}

export default SideNavDetails;
