import React, { useState, useEffect, useRef } from 'react';
import styles from './Location.module.css'
import NavBar from '../components/NavBar/navbar';
import goodplaces from '../images/goodplaces.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ImageSlider from '../components/ImageSlider/imageslider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "@fontsource/maven-pro";
import "@fontsource/maven-pro/700.css";

function Location(){
    // React router location to transfer data between selection and search when search is called
    const location = useLocation()
    const data = location.state
    console.log(data)

    // State to store value of favorites button
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = async() => {
        var tempFavorite = isFavorite;
        setIsFavorite(!isFavorite);
        tempFavorite = !tempFavorite

        if (tempFavorite === true) {
          // Set object to send to API
          var favorite = {
            TOKEN: sessionStorage.getItem('TOKEN'),
            LOCATION: data['location_id'],
            IMAGE: data['images'][0],
            NAME: data['name'],
            ADDRESS: data['address_obj']['address_string']
        }

        try{
            const response = await axios.post('/api/addfavorite', favorite)

        } catch (err) {
            console.log('Error: ', err)
        }
        }

        else if (tempFavorite === false) {
          // Set object to send to API
          var favorite = {
            TOKEN: sessionStorage.getItem('TOKEN'),
            LOCATION: data['location_id'],
            IMAGE: data['images'][0],
            NAME: data['name'],
            ADDRESS: data['address_obj']['address_string']
        }

        try{
            const response = await axios.post('/api/removefavorite', favorite)

        } catch (err) {
            console.log('Error: ', err)
        }
        }

    };

      return (
        <div className={styles.locationPage}>
            <NavBar/>

            <div className={styles.locationContainer}>

              <div className={styles.headerContainer}>
                <div className={styles.headerWrapper}>
                  <h1 className={styles.header}> {data['name']} </h1>
                </div>

                <div className={styles.addressWrapper}>
                  <p className={styles.address}> {data['address_obj']['address_string']} </p>
                </div>

                <div className={styles.favoriteWrapper}>
                  {sessionStorage.getItem('loginvisible') === 'false' && (
                    <div className={`${styles.favoriteButton} ${isFavorite ? styles.clicked : ''}`} onClick={toggleFavorite}>
                        <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.imageContainer}>
                  <ImageSlider images={data['images']}/>
              </div>

              <div className={styles.descriptionWrapper}>
                <p className={styles.description}> {data['description']} </p>
              </div>

            </div>
        </div>
      );
}

export default Location;