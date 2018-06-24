import fetch from 'isomorphic-fetch';
//const DOMAIN = "dev.encuentrojuvenil.co";//dev
const DOMAIN = window.location.origin;//app
//const DOMAIN = "192.168.1.15:8000";//local
let getBaseUrl = ()=>{
    return `${DOMAIN}`;

}

const baseUrl = getBaseUrl();
let endpoint = "";
var api = {
    apiAuth:{
        async getApiAuth(){
            let options = {
                credentials: "same-origin",
            } 
            endpoint=`${baseUrl}/api/apiauth/`;
            const response = await fetch(
                endpoint,
                options
            );
            const data = await response.json();
            return data;
        }

    },
    inscriptions:{
        async getInscriptionList(){
            let searchParams = window.location.search;
            let options = {
                credentials: "same-origin"
            } 
            endpoint = `${baseUrl}/api/inscriptions/${searchParams}`;
            const response = await fetch(
                endpoint,
                options
            );
            const data = await response.json();
            return data;
        },
        async getYoungDetail(){
            const params = window.location.search;
            let options = {
                credentials: "same-origin"
            } 
            endpoint = `${baseUrl}/api/inscriptions/details/${params}`;
            const response = await fetch(
                endpoint,
                options
            );
            const data = await response.json();
            return data;

        }      

    },
    parents:{
        async getParentsList(){
            const params = window.location.search;
            let options = {
                credentials: "same-origin"
            } 
            const response = await fetch(
                `${baseUrl}/api/parentlist/${params}`,
                options
            );
            const data = await response.json();
            return data;

        }
    },
    brothers:{
        async getBrothersList(){
            const params = window.location.search;
            let options = {
                credentials: "same-origin"
            } 
            const response = await fetch(
                `${baseUrl}/api/brotherslist/${params}`,
                options
            );
            const data = await response.json();
            return data;

        }
    }

}
export default api;