import React from "react";
import "./VideoPlayer.css";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import RotateRightIcon from '@mui/icons-material/RotateRight';

const VideoPlayer = ({ currentVideo, like, dislike }) => {
  
  const handleDate = (dateString) => {
    const currentDate = new Date();

    // Extract the date, month, and year from the current date
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month starts from 0, so we add 1
    const year = currentDate.getFullYear();
    let date = new Date(dateString);

    const newyear = date.getFullYear();
    const newmonth = date.getMonth() + 1;
    const newday= date.getDate();
    
    console.log("month", month, newmonth);
    if (year - newyear !== 0) return year - newyear + " years ago";
    else if (newmonth - month !== 0) return newmonth - month + " months ago";
    else return (newday-day )+" days ago";
  };

  if (!currentVideo) {
    return <div className="iframe-container iframe-container-empty"><div><RotateRightIcon /></div></div>; // Render a loading state when currentVideo is null or empty
  }
  // console.log("what",currentVideo.votes.downVotes);
  const { title, previewImage, releaseDate, videoLink, viewCount, votes } =
    currentVideo;
  console.log(votes);
  return (
    <div className="iframe-container">
      <iframe
        className="iframe"
        src={`https://${videoLink}`}
        title="youtube video"
      ></iframe>
      <div className="video-footer">
        <div classname="left -footer">
          <h1>{title}</h1>
          <div className="video-footer-bottom">
            <p>{currentVideo.contentRating}</p>
            <li>{handleDate(releaseDate)}</li>
          </div>
        </div>
        <div className="right-footer">
          <Button
            sx={{ gap: "8px" }}
            onClick={like}
            className={votes ? (votes.upVotes === 1 ? "activelike" : "") : ""}
          >
            <ThumbUpIcon />
            {votes ? votes.upVotes : 0}
          </Button>
          <Button
            sx={{ gap: "8px" }}
            onClick={dislike}
            className={votes ? (votes.downVotes === 1 ? "activelike" : "") : ""}
          >
            <ThumbDownIcon />
            {votes ? votes.downVotes : 0}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
