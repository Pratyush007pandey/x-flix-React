import React from "react";
import {Button,Box } from '@mui/material';
import "./Header.css";
import Logo from './Logo.png'
import UploadIcon from '@mui/icons-material/Upload';
import {Link} from 'react-router-dom'


const Header= ({handleDialogOpen,children,params})=> {

   console.log("hello bro",params);
    return(
      <Box className="container">
       <Link to={`/`}><Box className="header-title">
           <img src={Logo} alt="xfix logo" />
        </Box></Link>
        {children}
        { params ?<></>
        :<Button
          className="explore-button"
          onClick={handleDialogOpen}
          variant="text"
    
        >
          <UploadIcon />

          Upload
        </Button >
         }
      </Box>
    );
}
export default Header;