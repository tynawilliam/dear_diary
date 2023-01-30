import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loader() {
  return (
    <Box sx={{ display: "flex", marginLeft: "50vw", marginTop: "50vh" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
