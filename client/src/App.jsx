import { useState,createContext,useEffect } from 'react'
import styles from './styles/App.module.scss'
import Auth from './pages/Auth';
import {Route , Routes, useLocation,useNavigate} from 'react-router-dom'
import Home from './pages/Home';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';
import Navbar from './Component/Navbar';
const initalState={
  name:"",
  email:""
}
export const userData=createContext()
function App() {
  const [userInfo,setUserInfo]=useState(initalState);
  const [showNavbar,setShowNavbar]=useState();
  const navigate=useNavigate();
  const location=useLocation();
  const checkAuth=async()=>{
    try{
      const result=await axios.get("http://localhost:4000/check/auth",{withCredentials:true})
      if(result.status===200){
        setUserInfo(result.data);
      }
    }
    catch(err){
      if(err.response.status===500){
        toast.error("Server Internal Error... Please try again!")
      }
      else if(err.response.status===401){
        navigate("/auth");
      }
    }
  }
  useEffect(()=>{
    checkAuth();
  },[])
  useEffect(()=>{
    if(location.pathname.split("/")[1]==='auth'){
      setShowNavbar(false);
    }
    else{
      setShowNavbar(true);
    }
  },[location.pathname])
  return (
    <>
    <userData.Provider value={{userInfo,setUserInfo}}>
      <div className={styles.App}>
        <Toaster/>
        {showNavbar?<Navbar userInfo={userInfo}/>:<></>}
        <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path="/" element={<Home userInfo={userInfo}/>}/>
        </Routes>
      </div>
    </userData.Provider>
    </>
  )
}

export default App;
