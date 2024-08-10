import { makeStyles, Typography } from '@material-ui/core';
import { NetflixInput, NetflixButton } from './../styled/styledcomponents';
import { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase"
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((authUser)=> navigate("/"))
    .catch((err)=>alert(err.message))
  }

  const register = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser)=> navigate("/"))
      .catch((err)=>alert(err.message))
  }

  return (
    <div className={classes.root}>
        <Typography variant='h5' align='left'>
          Sign In
        </Typography>
        <form className={classes.form}>
          <NetflixInput 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type='email'
            placeholder="Email" 
            className={classes.email}/>
          <NetflixInput 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type='password'
            placeholder='Password' 
            className={classes.password}/>
          <NetflixButton 
          onClick={signIn}
          type="sumbit" 
          wide="medium" 
          radius>
            Sign In
          </NetflixButton>
          <Typography variant='subtitle2'>
            New to Netflix?{" "}
            <span 
            className={classes.SignUpLink}
            onClick={register}
            >
              Sign Up Now.{" "}
            </span>
          </Typography>
        </form>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "350px",
    width: "20rem",
    height: "25rem",
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: 'center',
  },
  form: {
    width: "80%",
  },
  email: {
    marginBottom: theme.spacing(2),
  },
  password: {
    marginBottom: theme.spacing(2),
  },
  SignUpLink: {
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    }
  },
}));


export default SignUp
