import React from 'react'
import { makeStyles } from '@material-ui/core';
import Header from './../components/Header';
import Banner from './../components/Banner';
import Rows from './../components/Rows';
import requests from './../Requests';

const Home = () => {
  return (
    <div>
        <Header/>
        <Banner/>
        <Rows title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
        <Rows title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Rows title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Rows title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Rows title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        <Rows title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
        <Rows title="Documentaries" fetchURL={requests.fetchDocumentaries} />

    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));


export default Home
