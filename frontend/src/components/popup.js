import React,{useState,useEffect} from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import './popup.css'
import { Dialog,DialogTitle,DialogActions,DialogContent,TextField,Stack,
         FormControl,Select,MenuItem,InputLabel,FormHelperText,Button} from "@mui/material";
const endpoint="https://99e6569e-3f9f-4612-a699-2e32966db66a.mock.pstmn.io/v1/videos";






const Popup = ({isDialogOpen,handleDialogClose}) =>{
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAgeGroup,setAgeGroup]=useState('');
  const [videoLink, setVideoLink] = useState('');
  const [ImageLink, setImageLink] = useState('');
  const [title, setTitle] = useState('');
  const [date,setDate]= useState('');
  const [form,setform] = useState({
    
    "videoLink": "",
    "title": "",
    "genre": "",
    "contentRating": "",
    "releaseDate": "",
    "previewImage": ""

})

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin:0,
          
          '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiIconButton-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Set the border color
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white', // Set the label color
          },
          '& .MuiInputBase-root': {
            color: 'white', // Set the input text color
          },
          '& .MuiInputBase-input': {
            borderBottomColor: 'white', // Set the input bottom border color
          },
          '& .MuiSelect-icon': {
            color: 'white', // Set the select icon color
          },
        },
        input: {
          color: 'white',
          
        },
        rootOutlined: {
          '& fieldset': {
            border: '2px solid white',
          },
          '&:hover fieldset': {
            border: '2px solid white',
          },
        },
        rootLabel: {
          color: 'white',
        },
        rootHelperText: {
          color: 'white',
        },
      },
    },
  },
});






  const uploadmodal=async(event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const date= formData.get('someDate');
    const newdate = new Date(date);
    const month = newdate.toLocaleString('default', { month: 'short' });
    const day = newdate.getDate();
    const year = newdate.getFullYear();
  
    const updatedForm = {
      "videoLink": formData.get('videoLink'),
      "title": formData.get('titleLink'),
      "genre": formData.get('genre'),
      "contentRating": formData.get('rating'),
      "releaseDate": `${day} ${month} ${year}`,
      "previewImage": formData.get('imageLink')
    };
    setform(updatedForm);
  
    try {
      const res = await axios.post(endpoint,updatedForm)
      console.log("success",res)
      setform({
        
    "videoLink": "",
    "title": "",
    "genre": "",
    "contentRating": "",
    "releaseDate": "",
    "previewImage": ""
  
    })

  setVideoLink('');
  setImageLink('');
  setTitle('');
  setSelectedGenre('');
  setAgeGroup('');
  setDate('');

    } catch (err) {
      console.log(err)
       }
 }

 useEffect(() => {
  console.log(form);
}, [form]);
  
  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose} className="dialog" >
      
      <DialogTitle className="popup-title">
      <h3>Upload Video</h3>
      <Button className="title-btn" onClick={handleDialogClose} sx={{color:'white'}}><CloseIcon></CloseIcon></Button>
      
      </DialogTitle>
      
      <form onSubmit={uploadmodal}>
        <DialogContent className="popup-content">
          {/* Content of the dialog */}
            <Stack spacing={2}>
            <ThemeProvider theme={theme}>
            <TextField 
            name="videoLink"
            className="items" 
            id="link" 
            label="Video Link" 
            // variant="outlined" 
            helperText="The Link will be used to derive the video"
            value={videoLink}
            onChange={(event) => setVideoLink(event.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            FormHelperTextProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }} />
              </ThemeProvider>

              
            <ThemeProvider theme={theme}>
            <TextField
            name="imageLink"
            id="link" 
            label="Thumbnail Image Link" 
            variant="outlined" 
            helperText="This Link will be used to preview the thumbnail image"
            value={ImageLink}
            onChange={(event) => setImageLink(event.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            FormHelperTextProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }} />
            </ThemeProvider>

            <ThemeProvider theme={theme}>
            <TextField 
            name="titleLink"
            className="items" 
            id="title" 
            label="Title" 
            variant="outlined" 
            helperText="The Title will be the representative text for the video"
            value={title}
            onChange={(event)=> setTitle(event.target.value)}
            InputProps={{
              style: { color: 'white' },
            }}
            FormHelperTextProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }} />
             </ThemeProvider>
             

            
            <FormControl fullWidth>
              <InputLabel id="select-label" sx={{color:'white'}}>Genre</InputLabel>
              
              <Select
              name="genre"
                labelId="select-label"
                id="select1"
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
                sx={{
                  "&:hover": {
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "1px solid white",
                    }},
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "1px solid white",
                  },
                  '& .MuiSelect-icon': {
                    display: 'none',
                  },
                  
                  border:'0px',
                  color: "#fff",
                  }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Movie">Movie</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
              </Select>
              
              <FormHelperText sx={{color:'white'}}>Genre will help in categorising your video</FormHelperText>
            </FormControl>
  
            
            <FormControl fullWidth>
              <InputLabel id="select-label" sx={{color:'white'}}>Suitable age group for the link</InputLabel>
              <Select
              name="rating"
                labelId="select-label"
                id="select2"
                value={selectedAgeGroup}
                onChange={(event) => setAgeGroup(event.target.value)}
                sx={{
                  "&:hover": {
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "1px solid white",
                    }},
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "1px solid white",
                  },
                  '& .MuiSelect-icon': {
                    display: 'none',
                  },
                  
                  border:'0px',
                  color: "#fff",
                  }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Anyone">Anyone</MenuItem>
                <MenuItem value="7+">7+</MenuItem>
                <MenuItem value="12+">12+</MenuItem>
                <MenuItem value="16+">16+</MenuItem>
                <MenuItem value="18+">18+</MenuItem>
              </Select>
              <FormHelperText sx={{color:'white'}}>This will be used to filter video on age group suitability</FormHelperText>
            </FormControl>
            <ThemeProvider theme={theme}>
            <TextField
             name="someDate"
             helperText="The Link will be used to sort the video"
             label="Release Date"
             type="date"
             value={date}
             onChange={(event) => setDate(event.target.value)}
             InputLabelProps={{
              shrink: true, // This will shrink the label when a date is selected
            }}
            FormHelperTextProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color:'white' },
            }}
      />
      </ThemeProvider>

          </Stack>
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#121212'}} className="popup-footer">
          {/* Actions of the dialog */}
          <Button onClick={handleDialogClose} sx={{color:'white'}}>
            Cancel
          </Button>
          <Button type="submit" sx={{backgroundColor:'red',color:'white'}}>
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  
 );
}
export default Popup;