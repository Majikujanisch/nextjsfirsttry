import Head from 'next/head'
import React, { useCallback } from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Link from "next/link";
import Dropdown from '../component/Dropdown'
import Numberpad from '../component/Numberpad';
import APIButton from '../component/APILoginButton';

import style from "../styles/Login.module.css"

const items = [
  {
    label:"RAUM AUSWAHL",
    value: "0"
  },
  {
      label: "Raum 1",
      value: "1"
  },
  {
      label: "Raum 2",
      value: "2"
  },
  {
      label: "Raum 3",
      value: "3"
  },
];
//Session Check
import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"

const ory = new V0alpha2Api(new Configuration(edgeConfig))


// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity:Identity) => identity.traits.username
const getPass  = (identity:Identity) => identity.traits.password

export default function Login() {
  //Session Handling
  const router = useRouter()
  const [session, setSession] = useState<Session | undefined>()
  // The error message or undefined.
  const [error, setError] = useState<any>()
  //state for room to handle
  const [selectedRoom, setSelectedRoom] = useState(0);
  const handleStateChange = useCallback((onSelectedItemChange) => setSelectedRoom(onSelectedItemChange.selectedItem.value) ,[]);
  
  //const delusertest = useCallback(()=>ory.adminGetIdentity("ecc393ba-d46f-4fea-b1c6-6edbdad60734", Header={Authorization: "AzRrrvr93n07gTwFDDbNs9biAnrW3JYz"}), []);
  useEffect(() => {
    if (session || error) {
      return
    }
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
      })
      .catch(() => {
        // Redirect to login page
        return router.push("/Login")
      })
  })

  if (!session) {
    // Still loading
    return null
  }
  const route = (req: Request, res: Response) => {
    ory.createSelfServiceLogoutFlowUrlForBrowsers(session.id).then(({data}) => {
        console.log(data.logout_url) // The logout URL
        console.log(data.logout_token) // The logout token
        console.log(session)
        // You can render the logout URL like so:
       
      
        // Or call the logout token:
        ory.submitSelfServiceLogoutFlow(data.logout_token).then(() => {
          
         })
         return router.push("/Login")
      })
  }



 
  //(onSelectedItemChange) => setSelectedRoom(onSelectedItemChange.selectedItem.value)
  //(onSelectedItemChange) => console.log(onSelectedItemChange.selectedItem.value)

  return (
    <div className="container">
      <Head>
        <title>Log into User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
            {
              getUserName(session?.identity)
            }
        <div className={style.Dropdown}>
          <button onClick={route}>logout</button>
          
          <APIButton 
          apilink="http://localhost:4450/admin/identities/ecc393ba-d46f-4fea-b1c6-6edbdad60734"
          typeofReq="DEL"
          text = "DEL User"> 
          </APIButton>
          <APIButton
          apilink="http://localhost:4450/admin/identities/33673413-d82d-4854-93f2-7b9c8fc363ad"
          typeofReq="GET"
          text = "GET User Port 4450"></APIButton>
          <div className={style.Dropdown}>
            <h2>Raumauswahl </h2>
              <Dropdown
              items={items}
              id="room-switch"
              onSelectedItemChange={handleStateChange}
              defaultSelectedItem={items[0]} className={undefined} chosen={undefined}                />
          </div>
          <div className={style.adminbutton}>
            <button><Link href="/Admin"><a>Zur AdminSeite</a></Link></button>
          </div>
        </div>
        
      </main>

      <footer className={style.footer}>
        <p>footer</p>
      </footer>
    </div>
  )
}
