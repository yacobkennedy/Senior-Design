import { useState, useEffect } from 'react';
import styles from './Home.module.css'
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import background from '../images/background.png'
import "@fontsource/maven-pro";
import "@fontsource/maven-pro/700.css";


// Make dynamic pages off of selections from here, once localstorage place value gets set we can request that data from the api and make selections from there


function Home() {
    // State to manage if page is loading
    const [loading, setLoading] = useState(false);

    return(
        <div className={`${loading ? styles.loading : ''}`}>
            <div className={styles.homePage}>
                <NavBar/>
                <div className={styles.homeContainer}>

                    <div className={styles.header}>
                        
                        <p> Discover. Explore. Adventure. </p>
                    </div>

                    <div className={styles.selectionWrapper}>
                        <Selection height={55} buttonHeight={45} setLoading={setLoading}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;