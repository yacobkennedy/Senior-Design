import React, { useState } from 'react';
import styles from './imageslider.module.css';

function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={styles.slider}>
            <button className={styles.leftArrow} onClick={goToPrevSlide}>
                &lt;
            </button>
            <div className={styles.imageContainer}>
                <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
            </div>
            <button className={styles.rightArrow} onClick={goToNextSlide}>
                &gt;
            </button>
        </div>
    );
}

export default ImageSlider;