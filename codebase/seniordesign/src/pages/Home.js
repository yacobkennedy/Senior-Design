import { useState, useEffect } from 'react';
import styles from './Home.module.css'
import NavBar from '../components/NavBar/navbar';


function Home() {
    return(
        <div className={styles.homePage}>
            <NavBar/>
            <div className={styles.homeInfo}>
                
            </div>
        </div>
    )
}

export default Home;