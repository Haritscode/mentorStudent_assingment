import React from 'react';
import styles from '../../../styles/MicButton.module.scss'
const MicButton = ({icon,text,color,isActive,handlerClick}) => {
    return (
        <>
        <button className={styles.button} onClick={()=>handlerClick(!isActive)} style={!isActive?{opacity:0.5}:{}}>
            {icon}
            <p className={styles.text}>{text}</p>
        </button>  
        </>
    );
}

export default MicButton;
