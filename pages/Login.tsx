import { useRouter } from "next/router"
import { useCallback } from "react"






export default function Login() {
    const router = useRouter()
    const toreg = useCallback(()=>router.push("/Registration"),[])
    return <div>
        <p>Login</p>
        <button onClick={toreg}>Sign Up</button>
    </div>
}