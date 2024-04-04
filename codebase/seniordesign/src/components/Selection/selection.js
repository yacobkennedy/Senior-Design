import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import styles from './selection.module.css'
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom";

function Selection({height, buttonHeight}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Simulated data for autocomplete options
  const searchData = [
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Houston', label: 'Houston' },
    { value: 'Phoenix', label: 'Phoenix' },
  ];

  const searchButtonRef = useRef(null);
  const selectRef = useRef(null);

  // Adds refs to take away the enter keypress problems with selection and link the enter key to search button
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        searchButtonRef.current.click();
      }
    };

    const input = selectRef.current && selectRef.current.select && selectRef.current.select.input;
    if (input) {
      input.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (input) {
        input.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  // Functions used by the react select to change input, search for stuff, etc

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue.value);
      console.log("inputchange", newValue.value)
    } else {
      setSelectedOption(newValue);
      console.log("option", newValue)
    }
  };

  const handleInputChange = (inputValue, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(inputValue);
      console.log("input", inputValue)
    }
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    // Perform search action here
    console.log('Search button clicked!');
    // Once search is hit, set the state to that value
    setSelectedOption({ value: inputValue, label: inputValue })
    // May update to selectedOption or just change to use local storage instead.
    //APIsearch(inputValue)

    navigate("/search");
  };
  
  async function APIsearch(input) {
    var data
    var locationInfo = {
      LOCATION: input
    }
    try {
      const response = await axios.post('/api/selection', locationInfo)
      data = response.data
    } catch (err) {
      console.log('Error: ', err)
    }
    
    console.log(data)

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
  }

  const disableEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      searchButtonRef.current.click();
    }
  }

  // Custom styles to control the visual styling of the Select box
  const customStyles = {
    control: base => ({
      ...base,
      height: height,
      borderRadius: 25,
      backgroundColor: "#E5EAF5",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    })
  };

  const CustomDropdownIndicator = (props) => {
    return (
      <div ref={searchButtonRef} className={styles.dropdownIndicator} onClick={handleSearch}>
        <button type="button" className={styles.searchButton} style={{height: buttonHeight}}>Search</button>
      </div>
    );
  };

  // Custom components to change the look of the Select component
  // DropdownIndicator: CustomDropdownIndicator,
  const customComponents = {
    DropdownIndicator: CustomDropdownIndicator,
    IndicatorSeparator:() => null,
  }


  return (
      <Select
        className={styles.selection}
        value={selectedOption}
        onChange={handleChange}
        options={searchData}
        placeholder="Find a Destination..."
        isClearable
        styles={customStyles}
        components={customComponents}
        onInputChange={handleInputChange}
        isSearchable
        onKeyDown={disableEnterKey}
        ref={selectRef}
      />
  );
}

export default Selection;