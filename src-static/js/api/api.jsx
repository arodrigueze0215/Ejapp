import fetch from 'isomorphic-fetch';

const baseUrl = 'http://localhost:8000';
var api = {
    inscriptions:{
        async getInscriptionList(){
            let searchParams = window.location.search;
            console.log(searchParams);
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