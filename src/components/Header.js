import React from 'react'
import { AppBar, makeStyles, Toolbar, Avatar, IconButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../images/netflix-logo.png"

const Header = () => {
    const classes = useStyles()
    const history = useNavigate()
    const [show, setShow] = useState(false)

    useEffect(()=>{
      window.addEventListener("scroll", hideHeader)
      return ()=>window.removeEventListener("scroll", hideHeader)
    }, [])

    const hideHeader = () => {
      if(window.scrollY > 100){
        setShow(true)
      }else{
        setShow(false)
      }
    }

  return (
    <AppBar position='sticky' elevation={0} className={`${ classes.root } ${show && classes.transparent}`}>
        <Toolbar className={classes.toolbar}>
            <IconButton onClick={()=>history("/")}>
            <img src={logo} alt="Logo Netflix" className={classes.logo}/>
            </IconButton>
            <Avatar variant='square' style={{cursor: "pointer"}} onClick={()=>history("/profile")}/>
        </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor: "#111",
      top: 0,
      left: 0,
      right: 0,
  },
  transparent: {
    backgroundColor: "transparent"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
    logo: {
      width: "200px",
      cursor: "pointer"
    },
  }));
  
export default Header
