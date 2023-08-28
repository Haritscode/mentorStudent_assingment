import React from 'react';
import styles from '../../../styles/Profile.module.scss';
import axios from 'axios';
import toaster from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate=useNavigate();
    const logoutUser=async()=>{
        try{
            const result=await axios.get("http://localhost:4000/auth/logout",{withCredentials:true})
            if(result.status===200)
            {
                toaster.success("Logout Successfull")
                navigate('/auth')
            }
        }
        catch(err){
            toaster.error("Some Internal Error")
        }
    }
    return (
        <>
            <div className={styles.profile}>
                <ol className={styles.options}>
                    <li className={styles.logout}>
                        <button onClick={logoutUser} className={styles.button}>Logout</button>
                    </li>
                </ol>
            </div>  
        </>
    );
}

export default Profile;
