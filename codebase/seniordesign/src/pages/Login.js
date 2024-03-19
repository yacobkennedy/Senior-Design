import { useState, useEffect } from 'react';
import styles from './Login.module.css'
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";


function Login() {
    // State for email input
    const [username, setUsername] = useState('')

    // State for password input
    const [password, setPassword] = useState('')

    // State for error message if username or password is incorrect
    const [error, setError] = useState('')

    // Var for storing login response dict so we can parse through it
    var responsedict;
    

    // Functions for events and button clicks through the signup process
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // Function for handling login and checking credentials on the backend as well as pulling the token
    async function handleLogin() {
        // Set object to send to API
        var userinfo = {
            USERNAME: username,
            PASSWORD: password
        }

        // DELETE LATER
        console.log(username)
        console.log(password)

        try{
            const response = await axios.post('/api/login', userinfo)

            responsedict = response.data

        } catch (err) {
            console.log('Error: ', err)
        }

        loginLogic(responsedict)
    }

    // Function for handling response dictionary parsing and handling error message from API and redirection to other pages on successful login
    // Make this function handle the resetting of states since for example username shouldnt be reset if password is incorrect
    function loginLogic(responsedict) {
        console.log(responsedict)

        let response = responsedict['RESPONSE']
        let token = responsedict['TOKEN']

        if(response === "INCORRECT PASSWORD" || response === "UNKNOWN USER") {
            setError("Incorrect Credentials, please try again")
            setPassword('')
        }
        else {
            // This case pertains to user actually logging in so should push back to home page with user successfully logged in. It should remove the login button from visibility as well
            setUsername('')
            setPassword('')

            // Set session storage so user will be logged in for entirety of session
            sessionStorage.setItem("TOKEN", token)
        }

    }

    return(
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>

                <div className={styles.inputContainer}>
                    <h2 className={styles.header}>Welcome Back</h2>

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

                    <p className={styles.errorMessage}>{error}</p>

                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleLogin}> Sign In </button>
                    </div>

                </div>

                <div className={styles.signupContainer}>
                    <p>
                        Don't have an account? <br></br>
                        <Link to="/signup">Join Now!</Link>
                    </p>
                </div>

            </div>

        </div>
    )

}

export default Login;