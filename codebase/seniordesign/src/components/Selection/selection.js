import React, { useState } from 'react';
import Select from 'react-select';
import styles from './selection.module.css'

function Selection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  // Simulated data for autocomplete options
  const searchData = [
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Houston', label: 'Houston' },
    { value: 'Phoenix', label: 'Phoenix' },
  ];

  // Function to handle search input change
  // CHANGE THIS
  const handleInputChange = (inputValue) => {
    const filteredOptions = searchData.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log(filteredOptions)
    setOptions(filteredOptions);
  };

  // Custom styles to control the visual styling of the Select box
  const customStyles = {
    control: base => ({
      ...base,
      height: 45,
      borderRadius: 20,
      backgroundColor: "#E5EAF5"
    })
  };

  const CustomDropdownIndicator = (props) => {
    return (
      <div onClick={props.selectProps.onSearch}>
        <button type="button">Search</button>
      </div>
    );
  };

  // Custom components to change the look of the Select component
  // DropdownIndicator: CustomDropdownIndicator,
  const customComponents = {
    DropdownIndicator:() => null,
    IndicatorSeparator:() => null
  }

  return (
      <Select
        className={styles.selection}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        onInputChange={handleInputChange}
        placeholder="Find a Destination..."
        isClearable
        styles={customStyles}
        components={customComponents}
      />
  );
}

export default Selection;