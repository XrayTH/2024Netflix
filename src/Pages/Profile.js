import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Header from './../components/Header';
import netflixAvatar from "../images/5b50e75d07c726d36f397f6359098f58.png";
import Plans from './../components/Plans';
import { NetflixButton } from "../styled/styledcomponents";
import { auth, signOut } from "../firebase"; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './../features/UserSlice';

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const email = useSelector(selectUser)

  const handleSignOut = () => {
    signOut(auth) 
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  return (
    <div className={classes.root}>
      <Header />
      <Typography variant='h3'>Edit Profile</Typography>
      <div className={classes.info}>
        <img src={netflixAvatar} alt="avatar" />
        <div className={classes.details}>
          <div className={classes.plans}>
            <Typography variant='h6'>{email?.email}</Typography>
            <Typography className={classes.plansText} variant='h5' gutterBottom>Plans</Typography>
            <Plans cost={7.99}>Netflix Standard</Plans>
            <Plans cost={11.99}>Netflix Basic</Plans>
            <Plans wide="medium" color="gray" cost={15.99}>Netflix Premium</Plans>
            <NetflixButton onClick={handleSignOut} wide="fullWidth">Sign Out</NetflixButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    minHeight: "100vh",
    maxWidth: "800px",
    width: "100vw",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    width: "80%",
    display: 'flex',
    "& img": {
      height: "100px",
      [theme.breakpoints.down("sm")]: {
        display: 'none',
      }
    }
  },
  details: {
    width: "100%",
    marginLeft: theme.spacing(3),
    "& h6": {
      backgroundColor: "#aaa",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "18px",
    },
  },
  plans: {
    width: "100%",
  },
  plansText: {
    borderBottom: "1px solid lightgray"
  }
}));

export default Profile;
