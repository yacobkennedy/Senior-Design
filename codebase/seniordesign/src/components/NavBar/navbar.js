import { useState, useEffect } from 'react';
import styles from './navbar.module.css'
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

  // Handle the button click to navigate to the Signup page
  const useLogin = () => {
    navigate("/login");
  }


    return (
        <div className={styles.navbar}>

            <div className={styles.loginContainer}>
                
                <button className={styles.button} onClick={useLogin}> Login </button>
            </div>
            
        </div>
    )
}

export default NavBar;