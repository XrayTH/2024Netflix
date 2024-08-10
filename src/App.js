import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Paypal from './Pages/Paypal';
import Home from './Pages/Home';
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./features/UserSlice";

function App() {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Router>
        <Routes>
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/checkout' element={user ? <Paypal /> : <Navigate to="/login" />} />
          <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#111"
  },
}));

export default App;


