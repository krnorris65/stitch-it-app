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
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                public_profile: publicProfile.current.checked
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
        <>
            <h2>Welcome to Stitch It</h2>

            <article className="formEl">
                <div className="formBkgd">
                    <h3>Please Register</h3>
                    <div className="formgrid">
                        <label htmlFor="firstName">First Name:</label>
                        <input ref={firstName} type="text"
                            id="firstName"
                            placeholder="First Name"
                            required="" autoFocus="" />
                    </div>
                    <div className="formgrid">
                        <label htmlFor="lastName">Last Name:</label>
                        <input ref={lastName} type="text"
                            id="lastName"
                            placeholder="Last Name"
                            required="" autoFocus="" />
                    </div>
                    <div className="formgrid">
                        <label htmlFor="email">Email address:</label>
                        <input ref={email} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                    </div>
                    <div className="formgrid">
                        <label htmlFor="password">Password:</label>
                        <input ref={password} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                    </div>
                    <div className="formgrid">
                        <label htmlFor="publicProfile">Public Profile? <span className="subText">(anyone can view your designs)</span></label>
                        <input ref={publicProfile} type="checkbox"
                            id="publicProfile" />
                    </div>
                    <div className="alignRight">
                        <button type="button" className="formBtn" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Register