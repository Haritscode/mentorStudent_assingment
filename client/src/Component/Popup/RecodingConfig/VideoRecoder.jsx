import React from 'react';
import styles from '../../../styles/videoRecoder.module.scss'
const VideoRecoder = ({isCameraRecord,isScreenRecord,setIsCameraRecord,setIsScreenRecord,image,type}) => {
    const handlerButtonClick=()=>{
        if(type==="Screen and webcam"){
            setIsCameraRecord(true);
            setIsScreenRecord(true);
        }
        else{
            setIsCameraRecord(true);
            setIsScreenRecord(false);
        }
    }
    return (
        <>
            <li style={type==="Screen and webcam"?isCameraRecord && isScreenRecord?{}:{opacity:0.5}:isCameraRecord && !isScreenRecord?{}:{opacity:0.5}} className={styles.item}>
                <button onClick={handlerButtonClick} className={styles.button}>
                    <img className={styles.img} src={image} alt="none"/>
                    <p className={styles.type_name}>{type}</p>
                </button>
            </li>   
        </>
    );
}

export default VideoRecoder;
