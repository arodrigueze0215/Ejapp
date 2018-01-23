import fetch from 'isomorphic-fetch';
import gBaseUrl from './apiConfig.js'

const baseUrl = gBaseUrl;
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
                `${baseUrl}/api/inscriptions/${searchParams}`,
                options
            );
            const data = await response.json();
            return data;
        },
        async getYoungDetail(){
            const params = window.location.search;
            let options = {
                credentials: "same-origin",
            } 
            const response = await fetch(
                `${baseUrl}/api/inscriptions/details/${params}`,
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
                credentials: "same-origin",
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
                credentials: "same-origin",
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