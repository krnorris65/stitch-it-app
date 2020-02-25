import React, { useRef } from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

const Login = props => {
    const email = useRef()
    const password = useRef()

    const { login } = useSimpleAuth()

    const handleLogin = evt => {
        evt.preventDefault()

        if (email.current.value === "" || password.current.value === "") {
            alert("Please complete all fields")
        }
        else {

            const userInfo = {
                email: email.current.value,
                password: password.current.value
            }

            //login returns where the app should redirect to depending on if login was successful
            login(userInfo)
                .then(loginFailed => {

                    props.history.push("/")
                    //will reset login form if the user entered incorrect credentials and stays in the login page
                    if (loginFailed) {
                        email.current.value = ""
                        password.current.value = ""
                    }
                })
        }

    }
    return (
        <>
            <h2>Welcome to Stitch It</h2>

            <article className="formEl">
                <div className="formBkgd">
                    <h3>Please Login</h3>
                    <div className="formgrid">
                        <label htmlFor="email">Email address</label>
                        <input ref={email} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                    </div>
                    <div className="formgrid">
                        <label htmlFor="password">Password</label>
                        <input ref={password} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                    </div>
                    <div className="alignRight">
                        <button type="button" className="formBtn" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Login