import React, { useState, useEffect, useRef } from 'react';
import styles from './Favorites.module.css';
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import goodplaces from '../images/goodplaces.png';
import placeholder from '../images/placeholder.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "@fontsource/maven-pro";
import "@fontsource/maven-pro/700.css";

function Favorites() {
    // State to manage if page is loading
    const [loading, setLoading] = useState(false);

    // State to reload page when favorite is removed
    const [remove, setRemove] = useState('')

    const [pageData, setPageData] = useState([])

    // Navigation for between pages
    const navigate = useNavigate();

    const location = useLocation()
    const data = location.state
    console.log(data)
    
    useEffect(() => {
        setPageData(data)
    
      }, []);

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

    const removeFavorite = async(e, id, image, name, address) => {
        var tempData;
        // Preventing event propagation
        e.stopPropagation();

        console.log(id)
        console.log(image)
        console.log(name)
        console.log(address)
        // Set object to send to API
        var favorite = {
            TOKEN: sessionStorage.getItem('TOKEN'),
            LOCATION: id,
            IMAGE: image,
            NAME: name,
            ADDRESS: address
        }

        try{
            const response = await axios.post('/api/removefavorite', favorite)

        } catch (err) {
            console.log('Error: ', err)
        }

        // Get favorited pages to populate the dropdown list
        try{
            const response = await axios.post('/api/favorites', favorite)
            console.log(response.data)
            tempData = response.data

        } catch (err) {
            console.log('Error: ', err)
        }
        navigate("/favorites", {state: tempData})
    }

    return(
        <div className={`${loading ? styles.loading : ''}`}>
            <div className={styles.favoritesPage}>
                <NavBar />

                <div className={styles.favoritesContainer}>

                    <div className={styles.resultsContainer}>
                        <div className={styles.resultHeader}>

                        <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Favorites </h3>

                        </div>

                        {data.map((item) => (
                                <div className={styles.resultsWrapper}>
                                    <div key={item[0]} className={styles.resultsCard} onClick={() => handleDivClick(item[0])}>
                                        <div className={styles.imageWrapper}>
                                            <img className={styles.image} src={item[1]} onError={(e) => {e.target.src = placeholder}} alt="location image"/>
                                        </div>

                                        <div className={styles.textContainer}>
                                            <h3 className={styles.resultsName}>{item[2]}</h3>
                                            <p className={styles.resultsAddress}>{item[3]}</p>
                                        </div>

                                    
                                        <button className={styles.button} onClick={(e) => removeFavorite(e, item[0], item[1], item[2], item[3])}> Remove </button>
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites;