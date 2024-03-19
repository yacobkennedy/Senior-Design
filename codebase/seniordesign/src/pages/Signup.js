import { useState, useEffect } from 'react';
import styles from './Signup.module.css'
import axios from 'axios';


function Signup() {
    // State for email input
    const [username, setUsername] = useState('')

    // State for password input
    const [password, setPassword] = useState('')

    // State for firstname input
    const [firstname, setFirstname] = useState('')

    // State for lastname input
    const [lastname, setLastname] = useState('')
    

    // Functions for events and button clicks through the signup process
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value)
    }

    const handleLastnameChange = (event) => {
        setLastname(event.target.value)
    }

    // Function for signing up user and sending the API call
    async function handleSignup() {
        // Set object to send to API
        var userinfo = {
            USERNAME: username,
            PASSWORD: password,
            FIRSTNAME: firstname,
            LASTNAME: lastname
        }

        // DELETE LATER
        console.log("First Name: ", firstname)
        console.log("Last Name: ", lastname)
        console.log("Username: ", username)
        console.log("Password: ", password)


        try{
            const response = await axios.post('/api/signup', userinfo)
        } catch (err) {
            console.log('Error: ', err)
        }

        // Reset state after submit
        setUsername('')
        setPassword('')
        setFirstname('')
        setLastname('')


    }

    return(
        <div className={styles.signupPage}>
            <div className={styles.signupContainer}>

                <div className={styles.inputContainer}>
                    <h2>Sign Up and Explore with Goodplaces!</h2>

                    <div className={styles.nameContainer}>
                        <div className={styles.firstnameContainer}>
                            <input
                                className={styles.firstnameInput}
                                type="firstname"
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                onChange={handleFirstnameChange}
                                placeholder="First Name"
                            />
                        </div>

                        <div className={styles.lastnameContainer}>
                            <input
                                className={styles.lastnameInput}
                                type="lastname"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={handleLastnameChange}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div className={styles.emailContainer}>
                        <input
                            className={styles.emailInput}
                            type="email"
                            id="email"
                            name="email"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Email"
                        />
                    </div>

                    <div className={styles.passwordContainer}>
                        <input
                            className={styles.passwordInput}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleSignup}> Submit </button>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default Signup;