import Head from 'next/head'
import style from '../styles/Login.module.css'
export default function Login() {
  return (
    <div className="container">
      <Head>
        <title>Log into User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
