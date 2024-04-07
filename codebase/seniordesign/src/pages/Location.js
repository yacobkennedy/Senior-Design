import React, { useState, useEffect, useRef } from 'react';
import styles from './Location.module.css'
import NavBar from '../components/NavBar/navbar';
import goodplaces from '../images/goodplaces.png'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ImageSlider from '../components/ImageSlider/imageslider';

function Location(){
    // React router location to transfer data between selection and search when search is called
    const location = useLocation()
    const data = location.state
    console.log(data)


      return (
        <div className={styles.locationPage}>
            <NavBar/>

            <div className={styles.locationContainer}>

              <div className={styles.headerWrapper}>
                <h1> {data['name']} </h1>
                <p className={styles.address}> {data['address_obj']['address_string']} </p>
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