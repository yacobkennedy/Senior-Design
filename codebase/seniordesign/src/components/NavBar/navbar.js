import { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import goodplaces from '../../images/goodplaces.png';

function NavBar() {
  // Code to initially set visible sessionstorage value but not reset it every time component is rerendered
  useEffect(() => {
    // Check if the value exists in sessionStorage
    const storedValue = sessionStorage.getItem('loginvisible');

    // If the value doesn't exist, set it
    if (!storedValue) {
      sessionStorage.setItem('loginvisible', JSON.stringify(true));
      console.log('Value set in sessionStorage');
      setIsVisible(true)
    } else {
      console.log('Value already exists in sessionStorage');
    }
  }, []);

  // State to manage if Login button should be visible or replaced with the profile link
  const [isVisible, setIsVisible] = useState(JSON.parse(sessionStorage.getItem('loginvisible')))
  console.log('visibility', isVisible)

  const navigate = useNavigate();

  // Handle the button click to navigate to the Login page
  const useLogin = () => {
    navigate("/login");
  }

  // Function for handling profile options after login
  const profileDropdown = () => {

  }


  return (
      <div className={styles.navbar}>

          <div className={styles.loginContainer}>
              
              {isVisible && <button className={styles.button} onClick={useLogin}> Login </button>}

              {!isVisible && <select> Profile </select>}
          </div>

          <div className={styles.logoContainer}>
            <Link to="/">
              <img className={styles.logo} src={goodplaces} alt="logo image"/>
              </Link>
            <Link to="/" style={{ textDecoration: "none"}}>
              <p className={styles.logoText}> <b>Goodplaces</b></p>
              </Link>

          </div>
          
      </div>
  )
}

export default NavBar;