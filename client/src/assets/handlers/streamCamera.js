const streamCamera=async(isCameraRecord,isAudioRecord)=>{
    return navigator.mediaDevices.getUserMedia({
        video:isCameraRecord,
        audio:isAudioRecord
    })
}
export default streamCamera;