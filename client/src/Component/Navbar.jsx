import {useState, useContext } from 'react';
import { userData } from '../App';
import styles from '../styles/Navbar.module.scss'
import {Link} from 'react-router-dom'
import Profile from './Popup/Profile/Profile';
const Navbar = () => {
    const {userInfo}=useContext(userData);
    const [showProfileDetails,setShowProfileDetails]=useState(false);
    const handleMouseEnter=()=>{
        setShowProfileDetails(true)
    }
    const handlerMouseLeave=()=>{
        setShowProfileDetails(false)
    }
    return (
        <>
            <ol className={styles.navBar}>
                <li className={styles.left_section}>
                    <h2 className={styles.logo}>Recordii</h2>
                </li>
                    <li className={styles.right_section}>
                        <ol className={styles.items}>
                            {
                                userInfo.name.length>0 && userInfo.email.length>0?
                                    <><li className={styles.userName}>{`👋 Hi, ${userInfo.name}`}</li>
                                    <li className={styles.container} onMouseEnter={handleMouseEnter} onMouseLeave={handlerMouseLeave}>
                                        <p className={styles.email}>
                                            {userInfo.email}
                                        </p>
                                        {showProfileDetails?<Profile/>:<></>}
                                    </li>
                                    </>:
                                    <Link to="/auth"><li className={styles.login}>Signup/Login</li></Link>
                            }
                        </ol>
                    </li>
            </ol>  
        </>
    );
}

export default Navbar;
