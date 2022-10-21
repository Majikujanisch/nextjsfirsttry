import {  V0alpha2Api} from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"
import { Configuration} from "@ory/kratos-client"
export default function MetadataButton({ metadata, isAdmin , schemaId, state, username, apilink, typeofReq, text, id}){
    const bearer = "ory_pat_AzRrrvr93n07gTwFDDbNs9biAnrW3JYz"   //Environmental variabels!! TODO
    const ory = new V0alpha2Api(new Configuration(edgeConfig))
    let req = ""
    const callMetaButton = async ()=>{
    let bodybuilt = {}
    if(isAdmin){
        bodybuilt = JSON.stringify({
            "schema_id": "Benutzer",
            "state": "active",
            "traits":{
                "User" : username,
            },
            "metadata_admin": {metadata}
        })
        console.log(username)
    }
    else{
        bodybuilt = JSON.stringify({
            "metadata_public": {metadata},
            "schema_id": "Benutzer",
            "state": "active",
            "traits":{
                "User" : username,
            },
        })
    }
    const res = "";
        const data = "leer";
        let requestOptions = {}
        switch(typeofReq){
            
            case "GET":
                 requestOptions = {
                    method: 'GET',
                    headers: BearerHeader(bearer)
                };
                try{
                    res = await fetch(apilink, requestOptions);
                    data = await res.json()
                    console.log("Worked")
                    console.log(data);
                } catch (err){
                    console.log(err);
                    console.log("API ERR GET")
                    console.log(requestOptions)
                }
                break;
            case "DEL":
                 requestOptions = {
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

                }break;
            case "PUT":
                requestOptions = {
                    method: "PUT",
                    headers: {
                        Authorization: `bearer ${bearer}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: bodybuilt
                }
                try{
                    res = await fetch(apilink, requestOptions).then(handleResponse)
                    console.log(res);
                    
                } catch (err){
                    console.log("Exception when calling V0alpha2Api.AdminUpdateIdentity: " + err)

                }
            break;
            default: 
            console.log("Please use typeofReq that is declaired")
        }
}
    
    return(<div>
        <button 
        onClick={callMetaButton}
        >{text}</button>
        </div>
    )
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
export function Metacall (metadata, isAdmin , username, typeofReq, id){
    const callMetaButton = async ()=>{
        let bodybuilt = {}
        if(isAdmin){
            bodybuilt = JSON.stringify({
                "schema_id": "Benutzer",
                "state": "active",
                "traits":{
                    "User" : username,
                },
                "metadata_admin": {metadata}
            })
            console.log(username)
        }
        else{
            bodybuilt = JSON.stringify({
                "metadata_public": {metadata},
                "schema_id": "Benutzer",
                "state": "active",
                "traits":{
                    "User" : username,
                },
            })
        }
        const res = "";
            const data = "leer";
            let requestOptions = {}
            switch(typeofReq){
                
                case "GET":
                     requestOptions = {
                        method: 'GET',
                        headers: BearerHeader(bearer)
                    };
                    try{
                        res = await fetch(apilink, requestOptions);
                        data = await res.json()
                        console.log("Worked")
                        console.log(data);
                    } catch (err){
                        console.log(err);
                        console.log("API ERR GET")
                        console.log(requestOptions)
                    }
                    break;
                case "DEL":
                     requestOptions = {
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
    
                    }break;
                case "PUT":
                    requestOptions = {
                        method: "PUT",
                        headers: {
                            Authorization: `bearer ${bearer}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: bodybuilt
                    }
                    try{
                        res = await fetch(apilink, requestOptions).then(handleResponse)
                        console.log(res);
                        
                    } catch (err){
                        console.log("Exception when calling V0alpha2Api.AdminUpdateIdentity: " + err)
    
                    }
                break;
                default: 
                console.log("Please use typeofReq that is declaired")
            }
    }
}