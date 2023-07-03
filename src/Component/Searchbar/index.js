import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";
const SearchBar = ({ placeholder, onChange, label }) => {
  return (
    <TextField
      placeholder={`Search "${placeholder}"`}
      className="customSearchBar"
      label={label}
      fullWidth
      onChange={(value) => onChange(value)}
      type="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
