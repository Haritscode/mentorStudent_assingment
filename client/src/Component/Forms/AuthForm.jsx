import React, { useReducer,useState,useContext,useEffect } from 'react';
import { userData } from '../../App';
import styles from '../../styles/AuthForm.module.scss';
import { initalState,reducer } from '../../reducer/user.reducer';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
    const {setUserInfo}=useContext(userData);
    const [state,dispatch]=useReducer(reducer,initalState);
    const [errMessage,setErrMessage]=useState('');
    const navigate=useNavigate();
    const authUser=async()=>{
        if(state.email.length>0 && state.name.length>0)
        {
            try{
                const response=await axios.post("http://localhost:4000/auth",state,{withCredentials:true})
                if(response.status==200){
                    setUserInfo(response.data)
                    navigate('/');
                    setErrMessage("");
                }
            }
            catch(err){
                if(err.response.status===400){
                    setErrMessage("Invalid Name") 
                }
                else{
                    setErrMessage("server Internal Error")
                }
            }
        }
        else{
            setErrMessage("Name and Email Required")
        }
    }
    useEffect(()=>{
        if(errMessage){
            setErrMessage('')
        }
    },[state])
    return (
        <>
        <div className={styles.form_container}>
            <div className={styles.details}>
                <h1 className={styles.greeting}>Quick Start!</h1>
                <p className={styles.page_thumbnail}>Input Your credential Here!</p>
            </div>
            <div className={styles.errorBox}>

            <p className={styles.errorMessage}>
                {errMessage.length>0?errMessage:""}
            </p>
            </div>
            <form onSubmit={e=>e.preventDefault()} className={styles.AuthForm}>
                <Input required={true} value={state.name} dispatch={dispatch} label={"Name"}/>
                <Input required={true} value={state.email} dispatch={dispatch} label={"Email"}/>
                <Button handleButtonClick={authUser} backgroundColor={"#4a74ea"}/>
            </form>
        </div>
        </>
    );
}

export default AuthForm;
