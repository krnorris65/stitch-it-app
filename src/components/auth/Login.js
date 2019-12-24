import React, {useRef} from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

const Login = props => {
    const email = useRef()
    const password = useRef()

    const {login} = useSimpleAuth()

    const handleLogin = evt => {
        evt.preventDefault()

        const userInfo = {
            email: email.current.value,
            password: password.current.value
        }

        login(userInfo)
        .then( () => props.history.push("/"))
    }
    return (
        <form onSubmit={handleLogin}>
            <fieldset>
                <h3>Please Login</h3>
                <div className="formgrid">
                    <input ref={email} type="email"
                        id="email"
                        placeholder="Email address"
                        required="" autoFocus="" />
                    <label htmlFor="inputEmail">Email address</label>

                    <input ref={password} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <button type="submit">Login</button>
            </fieldset>
        </form>
    )
}

export default Login