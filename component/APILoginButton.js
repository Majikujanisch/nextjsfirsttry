import APIHandler from "../pages/api/handler"
import  { userService }  from '../services/user.service';
import axios from 'axios';
import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client"
import getConfig from 'next/config';
import oath from "@ory/oathkeeper-client"
import { edgeConfig } from "@ory/integrations/next"
const { publicRuntimeConfig } = getConfig();
import layout from "../styles/APIButton.module.css"
function APILoginButton({apilink, typeofReq, text}){
   const bearer = "ory_pat_AzRrrvr93n07gTwFDDbNs9biAnrW3JYz"   //Environmental variabels!! TODO

    const callAPILoginPin = async () => {
        const res = "";
        const data = "leer";
        switch(typeofReq){
            
            case "GET":
                const requestOptionsGet = {
                    method: 'GET',
                    headers: BearerHeader(bearer)
                };
                try{
                    res = await fetch(apilink, requestOptionsGet);
                    data = await res.json()
                    console.log("Worked")
                    console.log(data);
                } catch (err){
                    console.log(err);
                    console.log("API ERR GET")
                    console.log(requestOptionsGet)
                }
                break;
            case "DEL":
                const requestOptions = {
                    method: 'DELETE',
                    headers: BearerHeader(bearer)
                };
                try{
                    res = await fetch(apilink, requestOptions).then(handleResponse);
                    data = await res.json();
                    console.log(data);
                    
                    
                } catch (err){
                    console.log(requestOptions.headers)
                    console.log(err);
                    console.log("API ERR DEL")
                    console.log({apilink})

                }
            break;
            default: 
            console.log("Please use typeofReq that is declaired")
        }
    
    };
    return (
        <div className={layout.container}>
			<main className={layout.main}>
				<button onClick={callAPILoginPin} className={layout.button}>{text}</button>
			</main>
		</div>
    )
}
function BasicauthHeader(username) {
    // return auth header with basic auth credentials if user is logged in and request is to the api url
    //const user = userService.userValue;
    
    let authdata = userService.getAuthdata(username, pass);
    const isApiUrl = true //url.startsWith(publicRuntimeConfig.apiUrl);
    console.log(pass + "    AUTHDATA");
    
    if (pass != "") {
        console.log("Authorization:"  +  "Basic " + authdata )
        return { Authorization: "Basic " + authdata };
    } else {
        return console.log("PASSWORT eingeben")
    }
}
function BearerHeader(token){
    return {Authorization: `bearer ${token}`}
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (response == 401 || response == 403) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }
            

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export default APILoginButton