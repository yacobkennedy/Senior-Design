import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css';
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import goodplaces from '../images/goodplaces.png';
import placeholder from '../images/placeholder.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function Search() {
    // State to manage if page is loading
    const [loading, setLoading] = useState(false);

    const [topResult, setTopResult] = useState(null); // Use state to store topResult
    
    // Navigation for between pages
    const navigate = useNavigate();

    // React router location to transfer data between selection and search when search is called
    const location = useLocation()
    const data = location.state
    
    useEffect(() => {
        // Checks if data exists and isnt 0
        if (data && data.length > 0) {
            // Set the first item in the data array as the top result
            setTopResult(data[0]);
        }
    }, [data]); // Trigger effect when data changes

    const handleDivClick = async (locationId) => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
      };

      return(
        <div className={`${loading ? styles.loading : ''}`}>
            <div className={styles.searchPage}>
                <NavBar/>

                <div className={styles.searchContainer}>

                    <div className={styles.selectionWrapper}>
                        <Selection height={45} buttonHeight={35} setLoading={setLoading}/>
                    </div>

                    <div className={styles.topResultContainer}>

                        <div className={styles.topResultHeader}>

                            <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Top Result </h3>

                        </div>

                        <div className={styles.topResultCard} onClick={() => handleDivClick(topResult?.location_id)}>

                            <img className={styles.image} src={topResult?.image} onError={(e) => {e.target.src = placeholder}} alt="location image"/>

                            <div>

                                <h3 className={styles.resultsName}>{topResult?.name}</h3>
                                <p className={styles.resultsAddress}>{topResult?.address_obj?.address_string}</p>

                            </div>

                        </div>
                    </div>

                    <div className={styles.resultsContainer}>
                        <div className={styles.topResultHeader}>

                        <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Other Results </h3>

                        </div>

                        {data.slice(1).map((item) => (
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
        </div>

      )

}

export default Search;