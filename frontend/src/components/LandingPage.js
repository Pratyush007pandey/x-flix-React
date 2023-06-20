import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Header from './Header'
import FilterPills from './FilterPills'
import Dashboard from './Dashboard'
import Popup from './popup'
import SearchBar from './SearchBar'
import './LandingPage.css';
const endpoint = 'https://1b3168bd-9b7e-49fd-8943-6f16014bbace.mock.pstmn.io/v1/videos';



const LandingPage = ()=> {
  const [videos, setVideos] = useState([]);
  const [SelectedRating, setSelectedRating] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [allVideos,setAllVideos]= useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sort,setSort]=useState('default');
  const [Search,setSearch]=useState("")
  const [Timer,setTimer]=useState(null)



  const fetchData = async () => { //gets the video data of all videos
    try {
      const response = await axios.get('https://1b3168bd-9b7e-49fd-8943-6f16014bbace.mock.pstmn.io/v1/videos');
      setVideos(response.data.videos);
      console.log(response.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uniqueGenres = [...new Set(videos.map((video) => video.genre))];  // creates an array of unique genres
  const uniqueGenres2 = [...new Set(videos.map((video) => video.contentRating))]; //creates array of unique content Rating
  

   const handleFilterButtonClick = (selectedCategory) => {    // selects or deselect genre
    const filters = selectedFilters.includes(selectedCategory)
      ? selectedFilters.filter((cat) => cat !== selectedCategory)
      : [...selectedFilters, selectedCategory];
    setSelectedFilters(filters);
  };
  

  const handleContentRating = (rate) => {  //selects or deselect content rating
    if(rate!== SelectedRating)
    setSelectedRating(rate);
    else
    setSelectedRating("");
  }

  const handleSearch = (event) => {  // sets the value of searched item
    const inputSearch = event.target.value;
  
    if (Timer) {
      clearTimeout(Timer);
    }
  
    const searchTimeout = setTimeout(() => {
      setSearch(inputSearch);
    }, 2000);
  
    setTimer(searchTimeout);
  };

 
const fetchFilteredVideos= async ()=>{
    const params = {
      ...(Search.length && {title:Search}),...(selectedFilters.length && {genres:`${selectedFilters}`}),...(SelectedRating.length && {contentRating:SelectedRating})
  }
  try {
    const res = await axios.get(endpoint ,{params})
    console.log(res)
    setAllVideos(res.data.videos)
    
} catch(err) {
    console.log(err)
} 

  }



  useEffect(() => {
    fetchFilteredVideos();
  }, [selectedFilters,SelectedRating,Search]);

  const Sort = async(e) => {
    
    try {
      setSort(e);
       const res = await axios.get(endpoint ,{params:{sortBy:sort}})
       console.log(res)
       setAllVideos(res.data.videos)
       
   } catch(err) {
       console.log(err)
   } 
}

  useEffect(() => {
    Sort(sort);
 },[sort]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

 
  return (
    <div className="App">
      <Header handleDialogOpen={handleDialogOpen}>
        <SearchBar handleSearch={handleSearch}/>
      </Header>
      {/* {console.log("hello", JSON.stringify(uniqueGenres2))} */}
      <Popup isDialogOpen={isDialogOpen} handleDialogClose={handleDialogClose} />
      <FilterPills genres={uniqueGenres} rating={uniqueGenres2} handleFilterButtonClick={handleFilterButtonClick} SelectedRating={SelectedRating} selectedFilters={selectedFilters} handleContentRating={handleContentRating} Sort={Sort} sort={sort} />
      {/* {<Dashboard genre={selectedFilters} rate={SelectedRating}  />} */}
      <div className="video-section">
      <Dashboard allVideos={allVideos} />
      </div>
    </div>
  );
}

export default LandingPage;
