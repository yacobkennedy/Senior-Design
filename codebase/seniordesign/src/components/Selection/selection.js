import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import styles from './selection.module.css'

function Selection() {
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

  const handleSearch = () => {
    // Perform search action here
    console.log('Search button clicked!');
    // Once search is hit, set the state to that value
    setSelectedOption({ value: inputValue, label: inputValue })
  };

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
      height: 55,
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
        <button type="button" className={styles.searchButton}>Search</button>
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