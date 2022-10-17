import APIButton from '../component/APILoginButton';


export default function Admin() {
    return (<div>
        <APIButton 
          apilink="http://localhost:4450/admin/identities/e0ea57f0-3cbf-491e-a195-e6d8045d27c4"
          typeofReq="GET"
          text = "Get User"> 
          </APIButton>
    </div>)
}