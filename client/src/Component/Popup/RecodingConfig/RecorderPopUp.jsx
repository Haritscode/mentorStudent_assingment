import {useState,useEffect} from 'react';
import styles from '../../../styles/recoderpopup.module.scss';
import VideoRecoder from './VideoRecoder';
import AudioSelector from './MicButton';
import {BsMicFill,BsFillRecordCircleFill} from 'react-icons/bs'
import Select from '../../Inputs/Select';
const screenShareType=[
    {
        image:"secreenrecodingwithfacecam.webp",
        type:"Screen and webcam"
    },
    {
        image:"webcam.avif",
        type:"Webcam Only"
    }
]
const RecorderPopUp = ({isCameraRecord,isScreenRecord,isAudioRecord,setIsCameraRecord,setIsScreenRecord,setIsAudioRecord,setShowRecoderConfig,setIsRecording,setStorageLocation}) => {
    const [showError,setShowError]=useState(false);
    const startRecording=()=>{
        if(!isCameraRecord && !isScreenRecord){
            setShowError(true);
        }
        else if(isCameraRecord || isScreenRecord){
            setShowRecoderConfig(false);
            setIsRecording(true);
        }
    }
    useEffect(()=>{
        if(isCameraRecord || isScreenRecord){
            setShowError(false);
        }
    },[isCameraRecord,isScreenRecord])
    return (
        <>
            <div className={styles.configRecorder}>
                <h1 className={styles.logo}>Record</h1>
                <ol className={styles.screen_types}>
                    {screenShareType.map(({image,type},count)=><VideoRecoder key={count} isCameraRecord={isCameraRecord}
                    isScreenRecord={isScreenRecord}
                    setIsCameraRecord={setIsCameraRecord}
                    setIsScreenRecord={setIsScreenRecord}
                    image={image}
                    type={type}
                    />)}
                </ol>
                <AudioSelector handlerClick={setIsAudioRecord} isActive={isAudioRecord}  icon={<BsMicFill/>} text={"In Build Microphone"}/>
                <Select setStorageLocation={setStorageLocation}/>
                <button onClick={startRecording} className={styles.start_btn}>
                    <BsFillRecordCircleFill size={"2rem"} color={"red"}/>
                    Start Recording
                </button>
                {showError?<p className={styles.error}>Please select atleast one Video Recording option</p>:""}
            </div>
        </>
    );
}

export default RecorderPopUp;
