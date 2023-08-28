import {useState,useEffect,useRef, useContext} from 'react';
import styles from '../styles/Home.module.scss';
import RecorderPopUp from '../Component/Popup/RecodingConfig/RecorderPopUp';
import ScreenRecording from '../Component/ScreenRecording'
import axios from 'axios';
import startRecording from '../assets/handlers/startRecording'
import stopRecorder from '../assets/handlers/stopRecorder';
import toast from 'react-hot-toast';
import {userData} from '../App';
    // to stop recording

const Home = () => {
    const {userInfo}=useContext(userData);
    const [storageLocation,setStorageLocation]=useState('cloud');
    const [isCameraRecord,setIsCameraRecord]=useState(false);
    const [isScreenRecord,setIsScreenRecord]=useState(false);
    const [isAudioRecord,setIsAudioRecord]=useState(false);
    const [showRecoderConfig,setShowRecoderConfig]=useState(true);
    const [cameraStream,setCameraStream]=useState(null);
    const [screenStream,setScreenStream]=useState(null);
    const [cameraRecorder,setCameraRecorder]=useState(null);
    const [screenRecorder,setScreenRecord]=useState(null);
    const [isRecording,setIsRecording]=useState(false);
    const [recordedData,setRecorderData]=useState([]); 
    const mainScreenRef=useRef(null);
    const sideScreenRef=useRef(null);
    const notify=(success,message)=>{
        if(success==true){
            toast.success(message,{
                style:{
                    zIndex:200
                }
            })
        }
        else{
            toast.error(message,{
                style:{
                    zIndex:200
                }
            });
        }
    }
    // to start recording
    // store data after recording is stopped

    const storeInServer=async()=>{
        try{
            const formData=new FormData();
            recordedData.map(({type,blob})=>{
                formData.append(type,blob,`${userInfo.email}_${Date.now()}.webm`);
            })
            let response=await axios.post("http://localhost:4000/uploadFile",formData,{withCredentials:true});
            if(response.status===200)
            {
                setRecorderData([]);
                notify(true,"recording Saved in cloud")
            }
        }
        catch(err){
            notify(false,"Some Server Error... Please try Again");
        }
    }

    const saveData=()=>{
        if(storageLocation==="localStorage"){
            localStorage.setItem('recording',recordedData);
            notify(true,"Recording Saved in localStorage")
        }
        else if(storageLocation==="cloud"){
            console.log(recordedData);
            storeInServer();
        }
    }

    // to stop recording
    const stopRecording=()=>{
        console.log({msg:"stop recording"}) ;
        setIsRecording(false);
        if(screenRecorder || cameraRecorder ){
            if(cameraRecorder && !screenRecorder){
                stopRecorder(cameraRecorder,mainScreenRef,cameraStream,'camera',setIsAudioRecord,setIsCameraRecord,setIsScreenRecord,setRecorderData,setCameraStream,setScreenStream,recordedData);
            }
            else if(!cameraRecorder && screenRecorder){
                stopRecorder(screenRecorder,mainScreenRef,screenStream,'screen',setIsAudioRecord,setIsCameraRecord,setIsScreenRecord,setRecorderData,setCameraStream,setScreenStream,recordedData);
            }
            else if(cameraRecorder && screenRecorder){
                console.log("both");
                stopRecorder(cameraRecorder,sideScreenRef,cameraStream,'camera',setIsAudioRecord,setIsCameraRecord,setIsScreenRecord,setRecorderData,setCameraStream,setScreenStream,recordedData);
                stopRecorder(screenRecorder,mainScreenRef,screenStream,'screen',setIsAudioRecord,setIsCameraRecord,setIsScreenRecord,setRecorderData,setCameraStream,setScreenStream,recordedData);
            }
        }
    }
    useEffect(()=>{
        if(isRecording){
            startRecording(setCameraRecorder,setScreenRecord,setCameraStream,setScreenStream,mainScreenRef,sideScreenRef,isScreenRecord,isCameraRecord,isAudioRecord)
        }
    },[isRecording])
    useEffect(()=>{
        if(recordedData.length>0)
        {
            saveData();  
        }
    },[recordedData])
    return (
        <>
        <div className={styles.Home}>
            {
                <div className={styles.popup} style={showRecoderConfig?{}:{display:'none'}}>
                    <RecorderPopUp 
                    isCameraRecord={isCameraRecord}
                    isScreenRecord={isScreenRecord}
                    isAudioRecord={isAudioRecord}
                    setIsCameraRecord={setIsCameraRecord}
                    setIsScreenRecord={setIsScreenRecord}
                    setIsAudioRecord={setIsAudioRecord}
                    setShowRecoderConfig={setShowRecoderConfig}
                    setIsRecording={setIsRecording}
                    setStorageLocation={setStorageLocation}
                    />
                </div>
            }
            <div className={styles.screenRecording}>
                <ScreenRecording
                mainScreenRef={mainScreenRef}
                isRecording={isRecording}
                sideScreenRef={sideScreenRef}
                setShowRecoderConfig={setShowRecoderConfig}
                stopRecording={stopRecording}
                />
            </div>
        </div>
        </>
    );
}

export default Home;
