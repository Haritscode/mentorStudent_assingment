import React from 'react';
import styles from '../styles/ScreenRecoding.module.scss';
const ScreenRecording = ({mainScreenRef,isRecording,sideScreenRef,setShowRecoderConfig,stopRecording}) => {
    const handlerStopButton=()=>{
        stopRecording();
        setShowRecoderConfig(true);
    }
    return (
        <>
        <div className={styles.screenView}>
            <div className={styles.full_Screen}> 
                <video ref={mainScreenRef} autoPlay muted className={styles.main_recording}/>
            </div>
            <div className={styles.side_screen}>
                <video ref={sideScreenRef} autoPlay muted className={styles.main_recording}/>
            </div>
            <ol className={styles.recordingOptions}>
                <li className={styles.list}>
                    <button style={isRecording?{}:{display:"none"}} onClick={handlerStopButton} className={styles.stop_button}>Stop Recording</button>
                </li>
            </ol>
        </div>
        </>
    );
}

export default ScreenRecording;
