const streamScreen=async(isCameraRecord,isAudioRecord)=>{
    return navigator.mediaDevices.getDisplayMedia({
        video:isCameraRecord,
        audio:isAudioRecord,
    })
}
export default streamScreen;