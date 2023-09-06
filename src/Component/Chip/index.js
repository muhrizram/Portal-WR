import React from "react";
import { Chip } from "@mui/material";

export const ChipComponent = ({
  label,
  color = "success",
  variant = "filled",
  sx,
}) => {
  return <Chip label={label} variant={variant} color={color} sx={[sx]} />;
};
