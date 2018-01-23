const http= "http://";
const DOMAIN = "";
const ip = "159.203.32.194";
const PORT = "8000";

export const getBaseUrl = ()=>{
    debugger;
    if(DOMAIN!==""){
        return `${http}${DOMAIN}:${PORT}`;
    }else
        return `${http}${IP}:${PORT}/`;

}
