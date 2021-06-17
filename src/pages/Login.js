import React, { useState, useContext } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Login() {

    // redirect url
    let history = useHistory()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    const login = () => {
        const data = { username, password }
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) alert(response.data.error)
            else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({ username: response.data.username, id: response.data.id, status: true })
                history.push('/')
            }
        })
    }

    return (
        <div className="loginContainer">
            <input type="text" className="login" onChange={(event) => { setUsername(event.target.value) }} />
            <input type="password" className="password" onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
