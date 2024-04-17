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

    // State for name input
    const [name, setName] = useState('')

    // State for rating input
    const [rating, setRating] = useState('')

    // State for message input
    const [message, setMessage] = useState('')

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const popupRef = useRef(null);

    const handleNameChange = (event) => {
      setName(event.target.value)
  }

    const handleRatingChange = (event) => {
      setRating(event.target.value)
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

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

    const openPopup = () => {
      if (popupRef.current) {
        popupRef.current.style.display = 'block';
      }
      
    };
  
    const closePopup = () => {
      if (popupRef.current) {
        popupRef.current.style.display = 'none';
      }
    };

    const handleSubmit = async(event) => {
      event.preventDefault(); // Prevent form submission

      if (name == "") {
        setName("Anonymous")
      }

      var object = {
        LOCATION: data['location_id'],
        NAME: name,
        MESSAGE: message,
        RATING: rating,
      }
      
      console.log(data['location_id'])
      console.log("Name:", name);
      console.log("Rating:", rating);
      console.log("Message:", message);
  
      // Add logic here to handle the review data, such as submitting it to a server
      try{
        const response = await axios.post('/api/add_review', object)
      } catch (err) {
          console.log('Error: ', err)
      }

      // Clear the form fields
      setName('');
      setRating('');
      setMessage('');

      window.location.reload()
    }

    const [items, setItems] = useState([]);

    useEffect(() => {
      const url = `/api/get_reviews?location_id=${data['location_id']}`;
      fetch(url)  // Make a GET request to your Flask API endpoint
        .then(response => response.json())
        .then(data => {
          setItems(data);  // Update the state with the fetched data
        });
    }, data['location_id']);  // Empty dependency array to fetch data only once on component mount
    
    function cancel() {
      console.log("Cancelling")
      closePopup()

      setName('');
      setRating('');
      setMessage('');
    }

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

                <div className={styles.review_block}>
                <button onClick={openPopup} className={styles.reviewButton}>Leave A Review</button>

                  <div id="popup" className="popup" ref={popupRef}>
                  <div className="popup-content">
                    <form id="popup-form" onSubmit={handleSubmit}>
                      <div className={styles.nameContainer}>
                        <input
                          className={styles.nameInput}
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={handleNameChange}
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className={styles.ratingContainer}>
                        <input
                          className={styles.ratingInput}
                          type="number"
                          id="rating"
                          name="rating"
                          value={rating}
                          onChange={handleRatingChange}
                          placeholder="Rating"
                          required
                        />
                      </div>
                      <div className={styles.messageContainer}>
                        <textarea
                          className={styles.messageInput}
                          id="message"
                          name="message"
                          value={message}
                          onChange={handleMessageChange}
                          placeholder="Message"
                          rows="4"
                          required
                        />
                      </div>
                      <button type="submit" className = {styles.Submit}>Submit</button>
                      <button type="button" className = {styles.Cancel} onClick={cancel}>Cancel</button>
                    </form>
                    </div>
                  </div>

                  <ul id="reviews" className={styles.reviewList}>
                  {items.map((item, index) => (
                      <li key={index} className={styles.reviewItem}>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Rating:</strong> {item.rating}</p>
                        <p><strong>Message:</strong> {item.message}</p>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
        </div>
      );
}

export default Location;