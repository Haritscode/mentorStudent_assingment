import React from 'react';
import styles from '../../styles/Button.module.scss';
const Button = ({text="Login",width="100%",color="white",backgroundColor="#4a74ea",handleButtonClick=()=>{}}) => {
    return (
        <>
        <button onClick={handleButtonClick} className={styles.button} style={{width,color,backgroundColor}}>
            {text}
        </button>  
        </>
    );
}

export default Button;
