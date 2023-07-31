import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState, forwardRef, useImperativeHandle } from "react";

const Loading = forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    onLoad() {
      setIsLoading(true);
    },
    onFinish() {
      setIsLoading(false);
    },
  }));

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default Loading;
