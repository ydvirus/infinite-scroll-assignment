import { Box, TextField } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan } from "@mui/material/colors";

function GlobalFilter({ filter, setFilter }) {
  const theme = createTheme({
    palette: {
      primary: cyan,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          "& .MuiTextField-root": { marginTop: "20px", width: "50%" },
        }}
      >
        <TextField
          id="outlined-basic"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ bgcolor: "#fff", borderRadius: "4px", border: "none", '&:hover': { border: "1px solid primary.main"} }}
          label="Search customer"
          variant="outlined"
        />
      </Box>
    </ThemeProvider>
  );
}

export default GlobalFilter;
