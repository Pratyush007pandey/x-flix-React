import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./Dashboard.css";

const Dashboard = ({ allVideos }) => {
  if (!allVideos) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const handleDate = (dateString) => {
    let date = new Date(dateString);

    const newYear = date.getFullYear();
    const newMonth = date.getMonth() + 1;
    const newDay = date.getDate();

    if (year - newYear !== 0) {
      return year - newYear + " years ago";
    } else if (newMonth - month !== 0) {
      return newMonth - month + " months ago";
    } else {
      return newDay - day + " days ago";
    }
  };

  return (
    <Grid container spacing={3} className="container-grid">
      {allVideos.map((video) => (
        <Grid item xs={3} key={video._id}>
          <Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345 }} className="card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={video.previewImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    noWrap
                    variant="h6"
                    component="div"
                    className="title"
                  >
                    {video.title}
                  </Typography>
                  <div className="sub-title">
                    <Typography variant="subtitle2">
                      {handleDate(video.releaseDate)}
                    </Typography>
                    <div className="view-count">
                      <VisibilityIcon />
                      <Typography variant="subtitle2">
                        {video.viewCount}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
