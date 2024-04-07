import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import goodplaces from '../images/goodplaces.png';
import placeholder from '../images/placeholder.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function Search() {
    // Navigation for between pages
    const navigate = useNavigate();

    // React router location to transfer data between selection and search when search is called
    const location = useLocation()
    const data = location.state
    
    // First result in the list to show as top result
    const topResult = data.shift()

    const handleDivClick = async (locationId) => {
        console.log("Clicked on div with location ID:", locationId);
        // ADD API CALL WITH LOCATION ID HERE
        var location = {
          ID: locationId
        }

        try {
          const response = await axios.post('/api/location', location)
          const data = response.data

          navigate("/location", { state: data });
        } catch (err) {
          console.log('Error: ', err)
        }
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

                        <img className={styles.image} src={topResult.image} onError={(e) => {e.target.src = placeholder}} alt="location image"/>

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
                            <img className={styles.image} src={item.image} onError={(e) => {e.target.src = placeholder}} alt="location image"/>

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