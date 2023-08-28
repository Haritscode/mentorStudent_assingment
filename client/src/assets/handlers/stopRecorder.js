const stopRecorder=(recorder,screenRef,mediaStream,type,setIsAudioRecord,setIsCameraRecord,setIsScreenRecord,setRecorderData,setCameraStream,setScreenStream,recordedData)=>{
    recorder.stopRecording(()=>{
        const blob=recorder.getBlob();
        setRecorderData([...recordedData,{type,blob}])
        recorder.reset();
        setIsAudioRecord(false);
        setIsCameraRecord(false);
        setIsScreenRecord(false);
        if(screenRef.current){
            screenRef.current.srcObject=null;
        }
        const tracks=mediaStream.getTracks()
        tracks.forEach(track=>track.stop())
        setCameraStream(null);
        setScreenStream(null);
        // to close camera and mic
    })
}
export default stopRecorder;