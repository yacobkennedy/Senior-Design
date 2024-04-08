import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import styles from './selection.module.css'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

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
        buttonRef.current.click(); // Trigger button click
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

    // RESPONSE IS NOW FORMATTED CORRECTLY
    // NEED TO NOW REDIRECT TO A DIFFERENT HTML PAGE THAT SIMPLY LISTS EACH OF THE STRINGS 
    // WE NEED TO ALSO KEEP TRACK OF THE LOCATION IDs ASSOCIATED WITH EACH LISTING
    // ALSO, THE LOCATION SEARCH ONLY RETURNS 10 RESULTS PER SEARCH INPUT
    // FOR EXAMPLE, THE SAME STRING WITH THE SAME PARAMETERS RETURNS THE SAME LIST
    // IM NOT SURE MUCH CAN BE DONE ABOUT THE 10 LIMIT SO WE HAVE TO WORK WITH THAT FOR NOW
    // 
    // The way we have it set up, the API isn't using any of the optional parameters
    // I'm not fully sure how we'd be able to handle having parameters in the input,
    // so we may need to have something like checkboxes and additional inputs for the added parameters
    //
    // A better option might be to instead just call the API multiple times with each of the different parameters
    // for example, call it once with no category specified, then with 'hotels' specified then 'attractions' etc.
    // then compile all of the results into a comprehensive list while removing duplicates. 
    //
    // This will allow us to simulate a larger number of results than the API initially allows, however it will largely 
    // increase the number of API calls made.
    //
    // Additional option is to webscrape instead (JAKE OPTION) we'd need to figure out how to do that
    // can maybe just webscrape images and details which will reduce API calls but still allow us to provide 
    // some form of information


  return (
    <div className={styles.selectionContainer}>
      <input 
        className={styles.selection}
        ref={inputRef}
        style={{height: height}}
        type='search'
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder='Find a Destination...'
      />
      <button ref={buttonRef} className={styles.searchButton} style={{height: buttonHeight}} onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Selection;