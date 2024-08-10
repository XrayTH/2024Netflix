import { makeStyles, Typography, IconButton } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import axios from '../axios';

const Rows = ({ title, fetchURL, isLargeRow }) => {
    const classes = useStyles();
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        };
        fetchData();
    }, [fetchURL]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className={classes.root}>
            <Typography variant='h4'>{title}</Typography>
            <div className={classes.scrollContainer}>
                <IconButton className={`${classes.arrowButton} ${classes.leftButton}`} onClick={scrollLeft}>
                    &lt;
                </IconButton>
                <div className={classes.posters} ref={scrollRef}>
                    {
                        movies.map((movie) =>
                        ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                className={`${classes.poster} ${isLargeRow && classes.posterLarge}`}
                                key={movie.id}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie?.backdrop_path}`}
                                alt={movie?.name}
                            />
                        )
                        )
                    }
                </div>
                <IconButton className={`${classes.arrowButton} ${classes.rightButton}`} onClick={scrollRight}>
                    &gt;
                </IconButton>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        color: "#fff",
        marginLeft: theme.spacing(4),
    },
    scrollContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    posters: {
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    poster: {
        display: 'inline-block',
        maxHeight: "12rem",
        objectFit: "contain",
        marginRight: theme.spacing(1),
        transition: "transform 450ms",
        "&:hover": {
            transform: "scale(1.1)",
        },
    },
    posterLarge: {
        maxHeight: "15rem",
        "&:hover": {
            transform: "scale(1.15)"
        },
    },
    arrowButton: {
        color: "#fff",
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
    },
    leftButton: {
        left: 0,
    },
    rightButton: {
        right: 0,
    },
}));

export default Rows;
