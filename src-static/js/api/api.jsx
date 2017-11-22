import fetch from 'isomorphic-fetch';

const baseUrl = 'http://localhost:8000';
var api = {
    apiAuth:{
        async getApiAuth(){
            let options = {
                credentials: "same-origin",
            } 
            const response = await fetch(
                `${baseUrl}/api/apiauth/`,
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
                credentials: "same-origin",
            } 
            const response = await fetch(
                `${baseUrl}/api/inscriptionslist/${searchParams}`,
                options
            );
            const data = await response.json();
            return data;
        }

    }
}

export default api;