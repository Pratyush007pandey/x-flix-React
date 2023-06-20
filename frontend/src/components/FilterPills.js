import React from "react";
import { Button, Box, Select, MenuItem, Stack } from "@mui/material";
import "./FilterPills.css";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const FilterPills = ({
  genres,
  rating,
  selectedFilters,
  handleFilterButtonClick,
  handleContentRating,
  SelectedRating,
  Sort,
  sort,
}) => {
  return (
    <div className="pills-container">
      <Stack spacing={2} direction="row">
        {genres.map((genre, idx) => (
          <Button
            sx={{
              padding: "2px",
              minWidth: "unset",
              width: "fit-content",
            }}
            className={`genre ${
              selectedFilters?.includes(genre) ? "active" : ""
            }`}
            key={`filters-${idx}`}
            onClick={() => handleFilterButtonClick(genre)}
          >
            {genre}
          </Button>
        ))}

        <Box width="150px">
          <Select
            select
            fullWidth
            value={sort}
            className="button"
            sx={{
              "& .MuiSelect-icon": {
                display: "none",
              },
              width: 150,
              height: 30,
              marginRight: 15,
              marginTop: 0.5,
              border: "0px",
              color: "#fff",
            }}
            // label="Sort"
            onChange={(e) => Sort(e.target.value)}
          >
            <MenuItem value="default" disabled>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SwapVertIcon />
                <p>Sort By</p>
              </div>
            </MenuItem>
            <MenuItem value="releaseDate">
              <div style={{ display: "flex" }}>
                <SwapVertIcon />
                <p>release Date</p>
              </div>
            </MenuItem>
            <MenuItem value="viewCount">
              <div style={{ display: "flex" }}>
                <SwapVertIcon />
                <p>view count</p>
              </div>
            </MenuItem>
          </Select>
        </Box>
      </Stack>

      <Stack spacing={2} direction="row">
        {rating.map((rate) => (
          <Button
            className={`genre ${SelectedRating === rate ? "active" : ""}`}
            key={rate}
            onClick={() => handleContentRating(rate)}
          >
            {rate}
          </Button>
        ))}
      </Stack>
    </div>
  );
};
export default FilterPills;
