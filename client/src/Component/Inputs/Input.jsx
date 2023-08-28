import React from 'react';
import styles from '../../styles/Input.module.scss';
const Input = ({value,dispatch,label,required}) => {
    return (
        <>
        <div className={styles.input_wrapper}>
            <label className={styles.label} htmlFor={label}>{label}<span style={required?{color:"red"}:{display:"none"}}>*</span></label>
            <input required={required} className={styles.input} value={value} onChange={e=>dispatch({type:label.toUpperCase(),payload:e.target.value})}></input>            
        </div>
        </>
    );
}

export default Input;
