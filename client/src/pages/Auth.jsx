import { useContext,useEffect } from 'react';
import styles from '../styles/Auth.module.scss'
import AuthForm from '../Component/Forms/AuthForm';
import { userData } from '../App';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const {userInfo}=useContext(userData);
    const navigate=useNavigate();
    useEffect(()=>{
        if(userInfo?.name?.length>0 && userInfo?.email?.length>0)
        {
            navigate('/');
        }
    },[userInfo])
    return (
        <>
        <div className={styles.Auth}>
            <div className={styles.left_side}>
                <img src="./Auth.jpg" alt="none" className={styles.bg_image} />
            </div>
            <div className={styles.form_side}>
                <AuthForm/>
            </div>
        </div>
        </>
    );
}

export default Auth;
