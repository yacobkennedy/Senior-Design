import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
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

    // State for error message if username is already taken
    const [error, setError] = useState('')

    // Var for storing login response dict so we can parse through it
    var responsedict;

    const navigate = useNavigate();

    // Handle the event to navigate back to home page after successful login
    const goHome = () => {
        navigate("/");
    }
    

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

            responsedict = response.data
            console.log(responsedict)

        } catch (err) {
            console.log('Error: ', err)
        }

        let responseMsg = responsedict['RESPONSE']
        console.log("msg", responseMsg)

        if(responseMsg === "FAILURE") {
            setError("Username is already in use, please try again")
        }
        else{
            handleLogin()
        }


    }

    // Function to run login logic if sign up is successful so user is automatically logged in
    async function handleLogin() {
        // Reset state after submit if username is allowed
        setUsername('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setError('')

        // If successful account creation happens then the user should be logged in after sign up
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

        let response = responsedict['RESPONSE']
        let token = responsedict['TOKEN']
        let firstname = responsedict['FIRSTNAME']

        // Set session storage so user will be logged in for entirety of session
        sessionStorage.setItem("TOKEN", token)
        // Set session storage so that the login button will be removed and replaced with the user profile bubble
        sessionStorage.setItem("loginvisible", JSON.stringify(false))
        // Set session storage for the first initial that will be used to set the profile picture
        sessionStorage.setItem("initial", Array.from(firstname)[0].toUpperCase())

        //Navigate home after login
        goHome()
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

                    <p className={styles.errorMessage}>{error}</p>

                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleSignup}> Submit </button>
                    </div>

                </div>

            </div>
        </div>
    )

}

export default Signup;