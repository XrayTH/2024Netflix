import { makeStyles, Typography, Button } from '@material-ui/core'
import { useEffect, useState } from 'react';
import axios from '../axios';
import requests from './../Requests';

const Banner = () => {
    const classes = useStyles()
    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    const truncate = (string, n) => string?.length > n ? `${string.substr(0, n-1)} ...` : string

    useEffect(()=>{
      const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals)
        const random = Math.floor(Math.random()*request.data.results.length-1)
        setMovies(request.data.results[random])
        return request
      }
      fetchData()
    },[])

  return (
    <div className={classes.root} style={{ 
      backgroundImage: `url("${base_url}${movies?.backdrop_path}")`,
     }}>
      <div className={classes.content}>
        <Typography variant="h2" component="h1">
          {movies?.title || movies?.name || movies?.original_name}
        </Typography>
        <div className={classes.buttons}>
          <Button>Play</Button>
        <Button>My List</Button>
        <Typography style={{ wordWrap:"break-word" }} variant="h6" className={classes.description}>
          {
            truncate(movies?.overview, 160)
          }
        </Typography>
        <div className={classes.fadeBottom}/>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
      height: "100vh",
      objectFit: "contain",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'absolute',
      bottom: '10%',
      left: '5%',
      width: '50%',
      padding: theme.spacing(2),
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
  },
    buttons: {
      "& button": {
        cursor: "pointer",
        color: "#fff",
        fontWeight: 700,
        borderRadius: "5px",
        padding: theme.spacing(1, 4, 1, 4),
        marginRight: "1rem",
        backgroundColor: "rgba(51, 51, 51, 0.5)",
      },
      "& button:hover": {
        color: "#000",
        backgroundColor: "#e6e6e6"
      }
    },
    fadeBottom: {
      position: "absolute",
      top: "30vh",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
      backgroundImage:
        "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)",
    }
  }));

export default Banner
