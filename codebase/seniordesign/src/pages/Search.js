import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import goodplaces from '../images/goodplaces.png';
import { useLocation } from "react-router-dom";

function Search() {
    // React router location to transfer data between selection and search when search is called
    const location = useLocation()
    const data = location.state
    
    // First result in the list to show as top result
    const topResult = data.shift()
    console.log("topresult", topResult)

    const handleDivClick = (locationId) => {
        console.log("Clicked on div with location ID:", locationId);
        // ADD API CALL WITH LOCATION ID HERE
      };

      return(
        <div className={styles.searchPage}>
            <NavBar/>

            <div className={styles.searchContainer}>

                <div className={styles.selectionWrapper}>
                    <Selection height={45} buttonHeight={35}/>
                </div>

                <div className={styles.topResultContainer}>

                    <div className={styles.topResultHeader}>

                        <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Top Result </h3>

                    </div>

                    <div className={styles.topResultCard} onClick={() => handleDivClick(topResult.location_id)}>

                        <img className={styles.image} src={topResult.image} alt="location image"/>

                        <div>

                            <h3 className={styles.resultsName}>{topResult.name}</h3>
                            <p className={styles.resultsAddress}>{topResult.address_obj.address_string}</p>

                        </div>

                    </div>
                </div>

                <div className={styles.resultsContainer}>
                    <div className={styles.topResultHeader}>

                    <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Other Results </h3>

                    </div>

                    {data.map((item) => (
                        <div key={item.location_id} className={styles.resultsCard} onClick={() => handleDivClick(item.location_id)}>
                            <img className={styles.image} src={item.image} alt="location image"/>

                            <div>
                                <h3 className={styles.resultsName}>{item.name}</h3>
                                <p className={styles.resultsAddress}>{item.address_obj.address_string}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>

      )

}

export default Search;