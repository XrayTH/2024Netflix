import { makeStyles, Typography } from '@material-ui/core'
import logo from "../images/netflix-logo.png"
import HeroBanner from "../images/HeroBanner.jpg"
import { NetflixButton, NetflixInput } from "../styled/styledcomponents"
import { useState } from 'react'
import SignUp from './../components/SignUp';

const Login = () => {
  const classes = useStyles();
  const [signIn, setSignIn] = useState(false)
  return (
    <div className={classes.root}>
        <img src={logo} alt="Logo Netflix" className={classes.logo}/>
        <NetflixButton className={classes.session} onClick={()=>setSignIn(true)}>Iniciar sesion</NetflixButton>
        <div className={classes.info}>
          {
            signIn ? (<SignUp/>) : (
              <>
              <Typography variant='h4' gutterBottom>
              Unlimited films, TV programs and more.
            </Typography>
            <Typography variant='h5'>
              Watch anywhere. Cancel at any time.
            </Typography>
            <Typography variant='h6'gutterBottom>
              Ready to watch? Enter yout email to create or restart your membership.
            </Typography>
            <div className={classes.inputBlock}>
              <NetflixInput placeholder='Email address'/>
              <NetflixButton wide="medium" onClick={()=>setSignIn(true)}>GET STARTED</NetflixButton>
            </div>
            </>
            )
          }
            
        </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${HeroBanner})`,
    objectFit: "contain",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: "fixed",
    top: 0,
    left: 20,
    width: "150px",
    cursor: "pointer",
  },
  session: {
    position: "fixed",
    zIndex: 15,
    right: 20,
    top: 20,
  },
  info: {
    color: "#fff",
    zIndex: 15,
    textAlign: "center",
    "& h4": {
      fontWeight: 800,
    },
    "& h5": {
      fontWeight: 400,
    },
  },
}));


export default Login
