import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import styles from './selection.module.css'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "@fontsource/maven-pro";

function Selection({ height, buttonHeight, setLoading }) {
    // State for tracking input value being typed into the search bar
    const [inputValue, setInputValue] = useState('');

    // State for tracking final value in search bar after user is done typing
    const [selectedOption, setSelectedOption] = useState('');

    // Simulated data for autocomplete options
    const searchData = [
      //{ value: 'New York', label: 'New York' }
    ];

    // Consts for navigating between pages and tracking keypresses
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    // Function to use enter to trigger button
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch()
      }
    };

    // Functions used by the react select to change input, search for stuff, etc
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
      //console.log("current: ", event.target.value);
    };

    const handleSearch = async() => {
      var data;
      // Set loading value to true once the search button is clicked
      setLoading(true)
      // Once search is hit, set the state to that value
      setSelectedOption(inputValue)
      // May update to selectedOption or just change to use local storage instead.
      try {
        data = await APIsearch(inputValue);

        navigate("/search", { state: data });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false)
      }
    };
  
  
    async function APIsearch(input) {
      var data
      var locationInfo = {
        LOCATION: input
      }
      try {
        const response = await axios.post('/api/selection', locationInfo);
        data = response.data.data;
        console.log(data);
        return data;
      } catch (err) {
        console.log('Error: ', err);
        throw err; // Re-throwing the error so it can be caught by the caller
      }
    //const image_data = image_search()
    //const review_data = review_search()
    //const detail_data = detail_search()

  }

      
    async function image_search(id) {
      var location = {
          ID: id
      }
      var output

      try {
        const response = await axios.post('/api/images', location)
        output = response.data
      } catch (err) {
        console.log('Error: ', err)
      }

      console.log(output)
      return output
    }

    async function review_search(id) {
      var location = {
          ID: id
      }
      var output

      try {
        const response = await axios.post('/api/reviews', location)
        output = response.data
      } catch (err) {
        console.log('Error: ', err)
      }

      console.log(output)
      return output
    }

    async function detail_search(id) {
      var location = {
          ID: id
      }
      var output

      try {
        const response = await axios.post('/api/details', location)
        output = response.data
      } catch (err) {
        console.log('Error: ', err)
      }

      console.log(output)
      return output
    }


  return (
    <div className={styles.selectionContainer}>
      <input 
        className={styles.selection}
        ref={inputRef}
        style={{height: height}}
        type='search'
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder='Find somewhere fun'
      />
      <div className={styles.searchIcon} onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} size="lg" ref={buttonRef} />
      </div>
    </div>
  );
}

export default Selection;