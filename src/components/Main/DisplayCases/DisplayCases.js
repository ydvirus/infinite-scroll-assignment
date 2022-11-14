import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, grey } from '@mui/material/colors';
import useCasesFetch from './useCasesFetch';
import CasesData from '../../../data/CaseData.json';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import USER_DATA from '../../../data/MOCK_DATA.json';

function DisplayCases({ selectedCustomer }) {
  const data = useMemo(() => USER_DATA, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: cyan[500],
      },
    },
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#212121',
    border: '2px solid #212121',
    boxShadow: 24,
    borderRadius: '20px',
    p: 4,
  };
  const currentSelectedCustomer = data.find(
    (item) => item.customerId === selectedCustomer?.customerId
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalCases = useMemo(() => CasesData, []);
  const totalValidCases = totalCases.filter(
    (customerCase) => customerCase.customerId === selectedCustomer?.customerId
  );
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [selectedCustomer]);

  const { loading, cases, hasMore } = useCasesFetch(
    pageNumber,
    selectedCustomer
  );
  const observer = useRef();
  const lastCaseRef = useCallback(
    (lastNode) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }, 1000);
        }
      });
      if (lastNode) observer.current.observe(lastNode);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [loading, hasMore]
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper
        variant="outlined"
        sx={{
          width: 'inherit',
          margin: '1% 3%',
          minHeight: '356px',
          maxHeight: 'fit-content',
          paddingLeft: '15px',
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            paddingTop: '15px',
            paddingRight: '29px',
            paddingBottom: '6px',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <ArchiveOutlinedIcon color="primary" fontSize="large" />
            <Typography
              sx={{ letterSpacing: '1px' }}
            >{`OPEN CASES (${totalValidCases.length})`}</Typography>
            <NavigateNextIcon color="secondary" />
            <Typography
              sx={{ letterSpacing: '1px' }}
            >{`SHOWING CASES (${cases.length})`}</Typography>
          </Stack>
          {selectedCustomer && totalValidCases.length !== 0 ? (
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ width: 350, ...style }} role="presentation">
                  <Stack
                    direction="row"
                    sx={{
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    spacing={2}
                  >
                    <Box>
                      <AccountCircleIcon
                        fontSize="large"
                        sx={{ color: 'white' }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: '20px', color: 'white' }}
                      >{`${currentSelectedCustomer.firstName} ${currentSelectedCustomer.lastName}`}</Typography>
                      <Typography sx={{ color: 'white' }}>Customer</Typography>
                    </Box>
                    <Box>
                      <ArrowForwardIosIcon
                        sx={{ color: '#00bcd4' }}
                      ></ArrowForwardIosIcon>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    sx={{
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    spacing={3}
                  >
                    <Box sx={{ marginLeft: '5px' }}>
                      <PhoneIphoneIcon
                        sx={{ color: 'white' }}
                      ></PhoneIphoneIcon>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'white', fontSize: '15px' }}>
                        {currentSelectedCustomer.phone}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    spacing={3}
                  >
                    <Box sx={{ marginLeft: '5px' }}>
                      <EmailOutlinedIcon
                        sx={{ color: 'white' }}
                      ></EmailOutlinedIcon>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'white', fontSize: '15px' }}>
                        {currentSelectedCustomer.email}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    spacing={3}
                  >
                    <Box sx={{ marginLeft: '5px' }}>
                      <HomeOutlinedIcon
                        sx={{ color: 'white' }}
                      ></HomeOutlinedIcon>
                    </Box>
                    <Box sx={{ maxWidth: '200px' }}>
                      <Typography sx={{ color: 'white', fontSize: '15px' }}>
                        Address
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Modal>

              <Typography
                onClick={handleOpen}
                color="secondary"
                sx={{ fontWeight: '100', mr: 3, cursor: 'pointer' }}
              >
                Customer Profile
              </Typography>
              <Typography
                color="secondary"
                sx={{ fontWeight: '100', cursor: 'pointer' }}
              >
                New Case
              </Typography>
            </Box>
          ) : null}
        </Stack>

        {selectedCustomer && totalValidCases.length !== 0 ? (
          <TableContainer
            component={Box}
            className="main-container"
            elevation={4}
            sx={{
              width: 'inherit',
              height: '300px',
              paddingRight: '25px',
              paddingLeft: '42px',
              '&::-webkit-scrollbar': {
                width: 5,
                height: 5,
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#b2ebf2',
                borderRadius: 2,
              },
            }}
          >
            <Table sx={{ paddingLeft: '45px' }} aria-label="simple table">
              <TableBody>
                {cases.map((customerCase, index) => {
                  if (cases.length === index + 1) {
                    return (
                      <TableRow
                        ref={lastCaseRef}
                        key={index}
                        sx={{
                          '&:first-of-type td': {
                            borderTop: '2px solid rgba(224, 224, 224, 1)',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#00bcd4' }}>
                          {'ID#' + customerCase.caseId}
                        </TableCell>
                        <TableCell>{customerCase.title}</TableCell>
                        <TableCell>{customerCase.severity}</TableCell>
                        <TableCell>{customerCase.status}</TableCell>
                        <TableCell>{customerCase.OpenDate}</TableCell>
                      </TableRow>
                    );
                  } else {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:first-of-type td': {
                            borderTop: '2px solid rgba(224, 224, 224, 1)',
                          },
                        }}
                      >
                        <TableCell sx={{ color: '#00bcd4' }}>
                          {'ID#' + customerCase.caseId}
                        </TableCell>
                        <TableCell>{customerCase.title}</TableCell>
                        <TableCell>{customerCase.severity}</TableCell>
                        <TableCell>{customerCase.status}</TableCell>
                        <TableCell>{customerCase.OpenDate}</TableCell>
                      </TableRow>
                    );
                  }
                })}

                {/* For Showing Loading  */}
                {loading && (
                  <TableRow>
                    <TableCell sx={{ color: '#00bcd4' }}>
                      {'Loading...'}
                    </TableCell>
                    <TableCell>{loading && 'Loading...'}</TableCell>
                    <TableCell>{loading && 'Loading...'}</TableCell>
                    <TableCell>{loading && 'Loading...'}</TableCell>
                    <TableCell>{loading && 'Loading...'}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : selectedCustomer && totalValidCases.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              margin: 'auto',
              paddingTop: '5%',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ letterSpacing: '1px' }}>
              No cases available for this customer
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              margin: 'auto',
              paddingTop: '5%',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ letterSpacing: '1px' }}>
              No customer is selected
            </Typography>
          </Box>
        )}
      </Paper>
    </ThemeProvider>
  );
}

export default DisplayCases;
