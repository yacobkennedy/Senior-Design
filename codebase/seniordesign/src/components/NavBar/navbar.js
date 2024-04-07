import { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import goodplaces from '../../images/goodplaces.png';
import Profile from '../Profile/profile';

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

    const closeDropdown = (event) => {
      // Check if the click occurred outside of the dropdown menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', closeDropdown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };

  }, []);

  // State to manage if Login button should be visible or replaced with the profile link
  const [isVisible, setIsVisible] = useState(JSON.parse(sessionStorage.getItem('loginvisible')))
  console.log('visibility', isVisible)

  // State to manage if profile dropdown menu is visible or not
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Handle the button click to navigate to the Login page
  const useLogin = () => {
    navigate("/login");
  }

  // Set dropdown to opposite boolean value when the profile is clicked on again
  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  // Reverts login button back to visible and deletes all session storage valeus related to login
  function handleSignout() {
    sessionStorage.setItem('loginvisible', JSON.stringify(true));
    console.log('Value set in sessionStorage');
    setIsVisible(true)

    sessionStorage.removeItem('TOKEN')
    sessionStorage.removeItem('initial')
  }

  return (
      <div className={styles.navbar}>

          <div className={styles.loginContainer}>
              
              {isVisible && <button className={styles.button} onClick={useLogin}> Login </button>}

              {!isVisible && (<div className={styles.profileContainer} onClick={toggleDropdown} ref={dropdownRef}> <Profile initial={sessionStorage.getItem("initial")} /> {dropdown && (<div className={styles.dropdownMenu}>
                <button onClick={handleSignout}>Sign Out</button>
              </div>)} </div>)}
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