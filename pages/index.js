import Head from 'next/head'
import React, { useCallback } from 'react';
import { useState } from "react";

import Dropdown from '../component/Dropdown'
import Numberpad from '../component/Numberpad';

import style from '../styles/Login.module.css'

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
export default function Login() {
  //state for room to handle
  const [selectedRoom, setSelectedRoom] = useState(0);
  const handleStateChange = useCallback((onSelectedItemChange) => setSelectedRoom(onSelectedItemChange.selectedItem.value) ,[]);
  //(onSelectedItemChange) => setSelectedRoom(onSelectedItemChange.selectedItem.value)
  //(onSelectedItemChange) => console.log(onSelectedItemChange.selectedItem.value)
  return (
    <div className="container">
      <Head>
        <title>Log into User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        <div className={style.Dropdown}>
          <div className={style.Dropdown}>
            <h2>Raumauswahl </h2>
              <Dropdown
                items={ items }
                id="room-switch"
                onSelectedItemChange={ handleStateChange }
                defaultSelectedItem={items[0]} 
                />
          </div>
        </div>
        <div className={style.main}>
          <Numberpad></Numberpad>
        </div>
      </main>

      <footer className={style.footer}>
        <p>footer</p>
      </footer>
    </div>
  )
}
