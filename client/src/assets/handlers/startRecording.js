import RecordRTC from 'recordrtc';
import streamScreen from './streamScreen';
import streamCamera from './streamCamera';
const startRecording=async(setCameraRecorder,setScreenRecord,setCameraStream,setScreenStream,mainScreenRef,sideScreenRef,isScreenRecord,isCameraRecord,isAudioRecord)=>{
    if(!isScreenRecord && isCameraRecord){
        const cameraStream=await streamCamera(isCameraRecord,isAudioRecord);
        setCameraStream(cameraStream);
        const record=new RecordRTC(cameraStream,{
            type:'video',
        });
        record.startRecording();
        setCameraRecorder(record);
        if(mainScreenRef.current){
            mainScreenRef.current.srcObject=cameraStream;
        }
    }
    else if(isScreenRecord && isCameraRecord){
        const screenStream=await streamScreen(isCameraRecord,isAudioRecord)
        const cameraStream=await streamCamera(isCameraRecord,isAudioRecord);
        setScreenStream(screenStream);
        setCameraStream(cameraStream);
        const cameraRecord=new RecordRTC(cameraStream,{
            type:'video',
        });
        const screenRecord=new RecordRTC(screenStream,{
            type:'video'
        })
        cameraRecord.startRecording();
        screenRecord.startRecording();
        setCameraRecorder(cameraRecord);
        setScreenRecord(screenRecord);
        if(mainScreenRef.current){
            mainScreenRef.current.srcObject=screenStream;
            sideScreenRef.current.srcObject=cameraStream
        }
    }
}
export default startRecording;