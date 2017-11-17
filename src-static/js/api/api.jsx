import fetch from 'isomorphic-fetch';

const baseUrl = 'http://localhost:3000';
var api = {
    inscriptions:{
        async getInscriptionList(){
            const response = await fetch(`${baseUrl}/api/inscriptionslist/`);
            const data = await response.json();
            return data;
        }

    }
}

export default api;