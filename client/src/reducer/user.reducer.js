const initalState={
    name:"",
    email:""
}
const reducer=(state,action)=>{
    switch(action.type){
        case "NAME":
            return {...state,name:action.payload}
        case "EMAIL":
            return {...state,email:action.payload}
        default:
            return state;
    }
}
export {initalState,reducer}