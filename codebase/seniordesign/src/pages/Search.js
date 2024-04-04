import React, { useState, useEffect, useRef } from 'react';
import styles from './Search.module.css'
import NavBar from '../components/NavBar/navbar';
import Selection from '../components/Selection/selection';
import goodplaces from '../images/goodplaces.png'

function Search() {
    var data = {
        "data": [
          {
            "location_id": "60993",
            "name": "Cincinnati",
            "address_obj": {
              "state": "Ohio",
              "country": "United States",
              "address_string": "Cincinnati, OH"
            }
          },
          {
            "location_id": "95133",
            "name": "Hyatt Regency Cincinnati",
            "address_obj": {
              "street1": "151 W 5th St",
              "street2": "",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45202-2703",
              "address_string": "151 W 5th St, Cincinnati, OH 45202-2703"
            }
          },
          {
            "location_id": "123322",
            "name": "Graduate Cincinnati",
            "address_obj": {
              "street1": "151 Goodman Drive",
              "street2": "",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45219",
              "address_string": "151 Goodman Drive, Cincinnati, OH 45219"
            }
          },
          {
            "location_id": "105690",
            "name": "Cincinnati Art Museum",
            "address_obj": {
              "street1": "953 Eden Park Dr",
              "street2": "In Eden Park",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45202-1557",
              "address_string": "953 Eden Park Dr In Eden Park, Cincinnati, OH 45202-1557"
            }
          },
          {
            "location_id": "111521",
            "name": "The Westin Cincinnati",
            "address_obj": {
              "street1": "21 E. 5th Street",
              "street2": "",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45202",
              "address_string": "21 E. 5th Street, Cincinnati, OH 45202"
            }
          },
          {
            "location_id": "105691",
            "name": "Cincinnati Zoo & Botanical Garden",
            "address_obj": {
              "street1": "3400 Vine Street",
              "street2": "",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45220-1333",
              "address_string": "3400 Vine Street, Cincinnati, OH 45220-1333"
            }
          },
          {
            "location_id": "105687",
            "name": "Cincinnati Museum Center",
            "address_obj": {
              "street1": "1301 Western Ave",
              "street2": "Union Terminal",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45203-1138",
              "address_string": "1301 Western Ave Union Terminal, Cincinnati, OH 45203-1138"
            }
          },
          {
            "location_id": "95145",
            "name": "Hilton Cincinnati Netherland Plaza",
            "address_obj": {
              "street1": "35 West Fifth Street",
              "street2": "",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45202",
              "address_string": "35 West Fifth Street, Cincinnati, OH 45202"
            }
          },
          {
            "location_id": "281501",
            "name": "Cincinnati Music Hall",
            "address_obj": {
              "street1": "1241 Elm St",
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "postalcode": "45202-7531",
              "address_string": "1241 Elm St, Cincinnati, OH 45202-7531"
            }
          },
          {
            "location_id": "15241687",
            "name": "Cincinnati's Original Findlay Market Tour With Tastings",
            "address_obj": {
              "city": "Cincinnati",
              "state": "Ohio",
              "country": "United States",
              "address_string": "Cincinnati, OH"
            }
          }
        ]
      }

    const topResult = data.data.shift()

      return(
        <div className={styles.searchPage}>
            <NavBar/>

            <div className={styles.searchContainer}>

                <div className={styles.selectionWrapper}>
                    <Selection height={45} buttonHeight={35}/>
                </div>

                <div className={styles.topResultContainer}>

                    <div className={styles.topResultHeader}>

                        <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Top Result </h3>

                    </div>

                    <div className={styles.topResultCard}>

                        <img className={styles.image} src={goodplaces} alt="location image"/>

                        <div>

                            <h3 className={styles.resultsName}>{topResult.name}</h3>
                            <p className={styles.resultsAddress}>{topResult.address_obj.address_string}</p>

                        </div>

                    </div>
                </div>

                <div className={styles.resultsContainer}>
                    <div className={styles.topResultHeader}>

                    <h3 style={{marginTop: '0', marginBottom: '0', padding: '10px'}}> Other Results </h3>

                    </div>

                    {data.data.map((item) => (
                        <div key={item.location_id} className={styles.resultsCard}>
                            <img className={styles.image} src={goodplaces} alt="location image"/>

                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.address_obj.address_string}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>

      )

}

export default Search;