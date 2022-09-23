import Head from 'next/head'
import style from '../styles/Login.module.css'
import React, { useCallback } from 'react';
import Dropdown from '../component/Dropdown';
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
  const handleStateChange = useCallback((state) => console.log(state), []);
  return (
    <div className="container">
      <Head>
        <title>Log into User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={style.Dropdown}>
          <div className={style.Dropdown}>
            <h2>Raumauswahl </h2>
              <Dropdown
                items={ items }
                id="month-switcher"
                onStateChange={ handleStateChange }
                defaultSelectedItem={items[0]} />
          </div>
        </div>
        <div className={style.main}>
          <p>inputCode</p>
        </div>
        <div className={style.main}>
          <p>inputUserRoom</p>
        </div>
      </main>

      <footer className={style.footer}>
        <p>footer</p>
      </footer>
    </div>
  )
}
