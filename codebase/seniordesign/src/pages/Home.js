import { useState, useEffect } from 'react';
import styles from './Home.module.css'
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';


// Make dynamic pages off of selections from here, once localstorage place value gets set we can request that data from the api and make selections from there


function Home() {

    return(
        <div className={styles.homePage}>
            <NavBar/>
            <div className={styles.homeInfo}>

                <div className={styles.header}>
                    <p> <b>Discover. Explore. Adventure.</b> </p>
                </div>

                <div className={styles.selectionContainer}>
                    <Selection/>
                </div>
            </div>
        </div>
    )
}

export default Home;