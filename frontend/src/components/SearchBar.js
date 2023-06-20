import React from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { FormLabel } from "@mui/material";
import "./SearchBar.css";

const SearchBar = ({ handleSearch }) => {
  return (
    <Box className="searchbar">
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Set the border color
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // Set the label color
          },
          "& .MuiInputBase-root": {
            color: "white", // Set the input text color
          },
          "& .MuiInputBase-input": {
            borderBottomColor: "white", // Set the input bottom border color
          },
          "& .MuiSelect-icon": {
            color: "white", // Set the select icon color
          },
        }}
        className="search-bar"
        size="small"
        fullWidth
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment
              className="adonement"
              position="end"
              sx={{ color: "white" }}
            >
              <Search className="search-icon" color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
    </Box>
  );
};

export default SearchBar;
