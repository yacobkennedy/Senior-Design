import React, { useState, useEffect, useRef } from 'react';
import styles from './Location.module.css'
import NavBar from '../components/NavBar/navbar';
import goodplaces from '../images/goodplaces.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ImageSlider from '../components/ImageSlider/imageslider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
            LOCATION: data['location_id']
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
            LOCATION: data['location_id']
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

              <div className={styles.headerWrapper}>
                <h1> {data['name']} </h1>
                <p className={`${styles.address} ${sessionStorage.getItem('loginvisible') === 'true' && styles.addressMoved}`}> {data['address_obj']['address_string']} </p>
                {sessionStorage.getItem('loginvisible') === 'false' && (
                <div className={`${styles.favoriteButton} ${isFavorite ? styles.clicked : ''}`} onClick={toggleFavorite}>
                    <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
                </div>
                )}
              </div>

              <div className={styles.descriptionWrapper}>
                <p className={styles.description}> {data['description']} </p>
              </div>

              <div className={styles.imageContainer}>
                  <ImageSlider images={data['images']}/>
              </div>

            </div>
        </div>
      );
}

export default Location;