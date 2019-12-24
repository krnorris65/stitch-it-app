import React, { useRef } from 'react'
import useSimpleAuth from '../../hooks/ui/useSimpleAuth'

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()

    const { register } = useSimpleAuth()

    const handleRegister = evt => {
        evt.preventDefault()
        const userInfo = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: password.current.value
        }

        register(userInfo)
            .then(() => props.history.push("/"))
    }

    return (
        <form onSubmit={handleRegister}>
            <fieldset>
                <h3>Please Register</h3>
                <div className="formgrid">
                    <input ref={lastName} type="text"
                        id="lastName"
                        placeholder="Last Name"
                        required="" autoFocus="" />
                    <label htmlFor="inputLastName">Last Name</label>

                    <input ref={firstName} type="text"
                        id="firstName"
                        placeholder="First Name"
                        required="" autoFocus="" />
                    <label htmlFor="inputFirstName">First Name</label>

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
                <button type="submit">Register</button>
            </fieldset>
        </form>
    )
}