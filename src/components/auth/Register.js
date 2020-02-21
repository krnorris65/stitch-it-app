import React, { useRef } from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const publicProfile = useRef()

    const { register } = useSimpleAuth()

    const handleRegister = evt => {
        evt.preventDefault()
        if (email.current.value === "" || password.current.value === "" || firstName.current.value === "" || lastName.current.value === "") {
            alert("Please complete all fields")
        }
        else {

            const userInfo = {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                publicProfile: publicProfile.current.checked
            }

            register(userInfo)
                .then(redirectTo => {
                    props.history.push(redirectTo)

                    if (redirectTo === "/register") {
                        password.current.value = ""
                    }
                })
        }
    }

    return (
        <article>
            <fieldset className="formBkgd">
                <h3>Please Register</h3>
                <div className="formgrid">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input ref={firstName} type="text"
                        id="firstName"
                        placeholder="First Name"
                        required="" autoFocus="" />

                    <label htmlFor="inputLastName">Last Name</label>
                    <input ref={lastName} type="text"
                        id="lastName"
                        placeholder="Last Name"
                        required="" autoFocus="" />

                    <label htmlFor="inputEmail">Email address</label>
                    <input ref={email} type="email"
                        id="email"
                        placeholder="Email address"
                        required="" autoFocus="" />

                    <label htmlFor="inputPassword">Password</label>
                    <input ref={password} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />

                    <label htmlFor="inputPublic">Public Profile?</label>
                    <input ref={publicProfile} type="checkbox"
                        id="publicProfile" />

                </div>
                <button type="button" onClick={handleRegister}>Register</button>
            </fieldset>
        </article>
    )
}

export default Register