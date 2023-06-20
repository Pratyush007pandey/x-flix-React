import React, { useEffect, useState } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import axios from "axios";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import "./VideoPage.css";
const endpoint =
  "https://1b3168bd-9b7e-49fd-8943-6f16014bbace.mock.pstmn.io/v1/videos/";

const VideoPage = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [view, setviews] = useState(0);
  const [id, setid] = useState("");
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(endpoint);
        console.log(res);
        setAllVideos(res.data.videos);
        const data = res.data.videos.find((x) => x._id === params.id);
        console.log("hello", data.title, data.previewImage, data.votes);
        if (id !== params.id) {
          setid(params.id);
        }
        setCurrentVideo(data);
        setviews(view + 1);
        return res.data;
      } catch (error) {
        return error.data;
      }
    };
    fetchVideo();
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    increaseviews();
  }, [view]);

  // if (id !== params.id) {
  //   setid(params.id);
  // }

  const increaseviews = async () => {
    try {
      const res = await axios.patch(endpoint + `${params.id}/views`);

      console.log("hell", endpoint + `${params.id}/views`);
      setCurrentVideo({
        ...currentVideo,
        viewCount: currentVideo.viewCount + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const LikedVideo = async () => {
    if (currentVideo.votes.upVotes === 0) {
      setCurrentVideo({
        ...currentVideo,
        votes: {
          ...currentVideo.votes,
          upVotes: currentVideo.votes.upVotes + 1,
        },
      });

      try {
        const res = await axios.patch(endpoint + `${currentVideo._id}/votes`, {
          vote: "upVote",
          change: "increase",
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(currentVideo.votes);

  const DislikedVideo = async () => {
    if (currentVideo.votes.downVotes === 0) {
      setCurrentVideo({
        ...currentVideo,
        votes: {
          ...currentVideo.votes,
          downVotes: currentVideo.votes.downVotes + 1,
        },
      });

      try {
        const res = await axios.patch(endpoint + `${currentVideo._id}/votes`, {
          vote: "downVote",
          change: "increase",
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header params={params.id} />

      <div className="container-new">
        <VideoPlayer
          currentVideo={currentVideo}
          like={LikedVideo}
          dislike={DislikedVideo}
        />
        <hr />
        <Dashboard allVideos={allVideos} />
      </div>
    </>
  );
};
export default VideoPage;
